import { env } from '$env/dynamic/private';
import { PhoneRegex } from '$lib/regex';
import { logger } from '$lib/server/logger';
import { z } from 'zod';

export interface TwilioConfiguration {
	twilio_account_sid: string;
	twilio_auth_token: string;
	twilio_phone_number: string;
}

export const TwilioConfig = (): TwilioConfiguration => {
	const { success, data, error } = z
		.object({
			TWILIO_ACCOUNT_SID: z.string().min(1),
			TWILIO_AUTH_TOKEN: z.string().min(1),
			TWILIO_PHONE_NUMBER: z.string().regex(PhoneRegex),
		})
		.safeParse(env);

	if (!success) {
		logger.error(error.message);
	}

	return {
		twilio_account_sid: data!.TWILIO_ACCOUNT_SID,
		twilio_auth_token: data!.TWILIO_AUTH_TOKEN,
		twilio_phone_number: data!.TWILIO_PHONE_NUMBER,
	};
};
