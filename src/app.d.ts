// See https://svelte.dev/docs/kit/types#app.d.ts

import type { TwilioConfiguration } from '$lib/server/twilio';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
			twilio: {
				config: TwilioConfiguration;
				client: import('twilio').Twilio;
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
