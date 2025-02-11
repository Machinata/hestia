import { PhoneRegex } from '$lib/regex';
import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma/index.js';
import { fail, type Actions } from '@sveltejs/kit';
import twilio from 'twilio';
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
	default: async (event) => {
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

		const tenant = await prisma.tenantConfig.findUnique({
			where: {
				tenantId: event.locals.tenant.id,
			},
			select: {
				twilioConfig: true,
			},
		});

		const config = tenant?.twilioConfig;
		if (!config) {
			return fail(307, { error: 'no_twilio_config' });
		}

		const client = twilio(config.accountSID, config.authToken);

		try {
			const result = await client.messages.create({
				to: phone,
				body: message,
				from: config.phoneNumber,
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
