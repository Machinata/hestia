import { logger } from '$lib/server/logger';
import { z } from 'zod';

export interface TwilioConfiguration {
	twilio_account_sid: string;
	twilio_auth_token: string;
}

const LoadConfig = (): TwilioConfiguration => {
	const { success, data, error } = z
		.object({
			VITE_TWILIO_ACCOUNT_SID: z.string(),
			VITE_TWILIO_AUTH_TOKEN: z.string()
		})
		.safeParse(import.meta.env);

	if (!success) {
		logger.error(error.message);
	}

	return {
		twilio_account_sid: data!.VITE_TWILIO_ACCOUNT_SID,
		twilio_auth_token: data!.VITE_TWILIO_AUTH_TOKEN
	};
};

export const TwilioConfig = LoadConfig();