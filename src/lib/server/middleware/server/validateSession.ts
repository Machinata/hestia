import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma';
import { type Handle } from '@sveltejs/kit';
import { clerkClient } from 'clerk-sveltekit/server';

const publicRoutes = ['/login'];

const loginRedirect = () =>
	new Response(null, {
		status: 307,
		headers: {
			location: '/login',
		},
	});

async function findOrCreateTenant(tenantClerkId: string) {
	const tenant = await prisma.tenant.findUnique({
		where: {
			clerkOrganizationId: tenantClerkId,
		},
	});

	if (tenant) {
		return tenant;
	}

	const organization = await clerkClient.organizations.getOrganization({
		organizationId: tenantClerkId,
	});

	return await prisma.tenant.create({
		data: {
			clerkOrganizationId: tenantClerkId,
			name: organization.name,
			slug: organization.slug ?? `tenant-${tenantClerkId}`,
		},
	});
}

export function validateSession(): Handle {
	return async ({ event: { locals, url, ...rest }, resolve }) => {
		// Public route? LET THEM PASS!
		if (url !== null && publicRoutes.includes(url.pathname)) {
			return resolve({ locals, url, ...rest });
		}

		// No session, redirect!
		if (!locals.auth.sessionId) {
			return loginRedirect();
		}

		// No user, revoke session and redirect!
		if (!locals.auth.userId) {
			await clerkClient.sessions.revokeSession(locals.auth.sessionId);
			return loginRedirect();
		}

		// No org, signout and redirect!
		if (!locals.auth.orgId) {
			await clerkClient.sessions.revokeSession(locals.auth.sessionId);
			return loginRedirect();
		}

		// Make sure that a tenant exists for the clerk org
		const tenant = await findOrCreateTenant(locals.auth.orgId);

		// Make sure a user exists for the clerk user
		const clerkUser = await clerkClient.users.getUser(locals.auth.userId);

		let user = await prisma.user.findFirst({
			where: {
				clerkId: clerkUser.id,
				tenantId: tenant.id,
			},
		});

		if (!user) {
			if (clerkUser.emailAddresses.length === 0) {
				logger.error('User has no email address');
				await clerkClient.sessions.revokeSession(locals.auth.sessionId);

				return loginRedirect();
			}

			user = await prisma.user.create({
				data: {
					clerkId: clerkUser.id,
					email: clerkUser.emailAddresses[0].emailAddress,
					name: clerkUser.fullName ?? '',
					tenantId: tenant.id,
				},
			});

			if (clerkUser.fullName === null) {
				logger.warn(`User {${user.id}} has no name!`);
			}
		}

		// Load user and tenant into locals
		locals.user = user;
		locals.tenant = tenant;

		return resolve({ locals, url, ...rest });
	};
}
