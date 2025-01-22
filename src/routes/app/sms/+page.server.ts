import { TWILIO_PHONE_NUMBER } from '$env/static/private';
import { PhoneRegex } from '$lib/regex';
import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma/index.js';
import { TwilioClient } from '$lib/server/twilio';
import { fail, type Actions } from '@sveltejs/kit';
import zod from 'zod';

export const load = async (event) => {
	const tenantId = event.locals.tenant.id;

	const configs = await prisma.tenantConfig.findUnique({
		where: { tenantId: tenantId },
		select: {
			twilioConfig: {
				select: {
					accountSID: true,
					authToken: true,
					phoneNumber: true,
				},
			},
		},
	});

	const { success, error: validationError } = zod
		.object({
			accountSID: zod.string(),
		})
		.safeParse(configs?.twilioConfig);

	if (!success) {
		logger.warn(validationError.message);
	}

	return {
		isTwilioConfigured: success,
	};
};

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

		try {
			const result = await TwilioClient.messages.create({
				to: phone,
				body: message,
				from: TWILIO_PHONE_NUMBER,
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
