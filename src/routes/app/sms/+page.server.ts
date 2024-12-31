import { PhoneRegex } from '$lib/regex';
import { logger } from '$lib/server/logger';
import { TwilioConfig } from '$lib/server/twilio';
import { fail, type Actions } from '@sveltejs/kit';
import twilio from 'twilio';
import zod from 'zod';

export const actions = {
	push: async (event) => {
		const form = await event.request.formData();

		if (!form.has('phone')) {
			return fail(400, { error: 'phone_missing' });
		}
		if (!form.get('message')) {
			return fail(400, { error: 'message_missing' });
		}

		const {
			success: phoneSuccess,
			data: phone,
			error: phoneError,
		} = zod.string().regex(PhoneRegex).safeParse(form.get('phone'));
		if (!phoneSuccess) {
			logger.error(phoneError);
			return fail(400, { error: 'invalid_phone' });
		}

		const message = form.get('message');
		if (typeof message !== 'string') {
			return fail(400, { error: 'invalid_message' });
		}

		const twilioConfig = TwilioConfig();
		const twilioClient = twilio(
			twilioConfig.twilio_account_sid,
			twilioConfig.twilio_auth_token
		);

		try {
			const result = await twilioClient.messages.create({
				to: phone,
				body: message,
				from: twilioConfig.twilio_phone_number,
			});
			logger.debug(result);
		} catch (e) {
			logger.error(e);
			fail(500, { success: false });
		}
		return {
			success: true,
		};
	},
} satisfies Actions;