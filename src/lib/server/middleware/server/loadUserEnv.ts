import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';

const unAuthedRoutes = ['/login'];

export function loadUserEnv(): Handle {
	return async ({ event, resolve }) => {
		if (event.route.id === null || unAuthedRoutes.includes(event.route.id)) {
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
				logger.error(error.message);
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
