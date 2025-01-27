import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';

const publicRoutes = ['/login'];

export function loadUserEnv(): Handle {
	return async ({ event, resolve }) => {
		if (event.url !== null && publicRoutes.includes(event.url.pathname)) {
			return resolve(event);
		}
		try {
			const tenant = await prisma.tenant.findUniqueOrThrow({
				where: {
					clerkOrganizationId: event.locals.auth.orgId ?? undefined,
				},
			});
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					clerkId_tenantId: { clerkId: event.locals.auth.userId!, tenantId: tenant.id },
				},
			});

			event.locals.tenant = tenant;
			event.locals.user = user;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error);
			}
			return new Response(null, {
				status: 307,
				headers: {
					location: '/login',
				},
			});
		}

		return resolve(event);
	};
}
