// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Tenant, User } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: {
				userId?: string;
				orgId?: string | null;
				sessionId?: string;
			};
			user: User;
			tenant: Tenant;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
