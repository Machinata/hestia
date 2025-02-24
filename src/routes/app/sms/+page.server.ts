import type { Recipient } from '$lib/components/SMS';
import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma/index.js';
import { decryptTwilioConfig } from '$lib/server/twilio/index.js';
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
			authToken: zod.string(),
			phoneNumber: zod.string(),
		})
		.safeParse(configs?.twilioConfig);

	if (!success) {
		logger.warn(validationError.message);
	}

	const residents = await prisma.resident.findMany({
		where: {
			tenantId: event.locals.tenant.id,
		},
		select: {
			id: true,
			name: true,
			phoneNumber: true,
		},
	});

	return {
		isTwilioConfigured: success,
		residents: residents,
	};
};

export const actions = {
	default: async (event) => {
		const form = await event.request.formData();

		if (!form.has('recipients')) {
			return fail(400, { error: 'recipients_missing' });
		}
		if (!form.has('message')) {
			return fail(400, { error: 'message_missing' });
		}

		const recipients: Recipient[] = JSON.parse(form.get('recipients') as string);
		if (!Array.isArray(recipients)) {
			return fail(400, { error: 'invalid_recipients' });
		}
		logger.info(recipients);

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

		const decryptedConfig = decryptTwilioConfig(config);

		const client = twilio(decryptedConfig.accountSID, decryptedConfig.authToken);

		for (const recipient of recipients) {
			try {
				const result = await client.messages.create({
					to: recipient.phone,
					body: message,
					from: decryptedConfig.phoneNumber,
				});
				logger.debug(result);
			} catch (e) {
				logger.error(e);
				fail(500, { success: false });
			}
		}

		return {
			success: true,
		};
	},
} satisfies Actions;
