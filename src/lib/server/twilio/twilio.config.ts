import { PhoneRegex } from '$lib/regex';
import { logger } from '$lib/server/logger';
import { z } from 'zod';

export interface TwilioConfiguration {
	twilio_account_sid: string;
	twilio_auth_token: string;
	twilio_phone_number: string;
}

const LoadConfig = (): TwilioConfiguration => {
	const { success, data, error } = z
		.object({
			VITE_TWILIO_ACCOUNT_SID: z.string(),
			VITE_TWILIO_AUTH_TOKEN: z.string(),
			VITE_TWILIO_PHONE_NUMBER: z.string().regex(PhoneRegex),
		})
		.safeParse(import.meta.env);

	if (!success) {
		logger.error(error.message);
	}

	return {
		twilio_account_sid: data!.VITE_TWILIO_ACCOUNT_SID,
		twilio_auth_token: data!.VITE_TWILIO_AUTH_TOKEN,
		twilio_phone_number: data!.VITE_TWILIO_PHONE_NUMBER,
	};
};

export const TwilioConfig = LoadConfig();
