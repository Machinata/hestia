import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { prisma } from '../prisma';
import { createClerkClient } from '@clerk/backend';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { clerkClient } from 'clerk-sveltekit/server';
import { logger } from '$lib/server/logger';

const clerkSessionClient = createClerkClient({
	secretKey: CLERK_SECRET_KEY,
});

export async function validateSession({ locals }: ServerLoadEvent) {
	if (!locals.auth.userId || !locals.auth.sessionId) {
		return redirect(307, '/login');
	}

	if ((!locals.auth.orgId && locals.auth.sessionId) || !locals.auth.orgId) {
		// Sign out the user if they are not associated with an organization
		await clerkSessionClient.sessions.revokeSession(locals.auth.sessionId);
		return redirect(307, '/login');
	}

	const clerkUser = await clerkClient.users.getUser(locals.auth.userId);

	const tenantClerkId = locals.auth.orgId;

	let tenant = await prisma.tenant.findUnique({
		where: {
			clerkId: tenantClerkId,
		},
	});

	if (!tenant) {
		const organization = await clerkClient.organizations.getOrganization({
			organizationId: tenantClerkId,
		});

		tenant = await prisma.tenant.create({
			data: {
				clerkId: tenantClerkId,
				name: organization.name,
				slug: organization.slug ?? `tenant-${tenantClerkId}`,
			},
		});
	}

	let user = await prisma.user.findFirst({
		where: {
			clerkId: clerkUser.id,
			tenantId: tenant.id,
		},
	});

	if (!user) {
		if (clerkUser.emailAddresses.length === 0) {
			logger.error('User has no email address');
			await clerkSessionClient.sessions.revokeSession(locals.auth.sessionId);

			return redirect(307, '/login');
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
			logger.error('User has no name');
		}
	}

	return {
		user: { name: user.name },
	};
}
