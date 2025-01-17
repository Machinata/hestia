import { PhoneRegex } from '$lib/regex';
import { encrypt } from '$lib/server/crypto/encryption.js';
import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma';
import { fail, type Actions } from '@sveltejs/kit';
import zod from 'zod';

export const load = async (event) => {
	const tenantId = event.locals.auth!.orgId!;

	const configs = await prisma.tenantConfig.findUnique({
		where: { tenantId: tenantId },
		select: { accountSID: true, authToken: true, phoneNumber: true },
	});

	return {
		configs: configs,
	};
};

export const actions = {
	update: async (event) => {
		const form = await event.request.formData();
		const tenantId = event.locals.tenant.id;

		if (!form.has('accountSID')) {
			return fail(400, { error: 'account_sid_missing' });
		}
		if (!form.has('authToken')) {
			return fail(400, { error: 'auth_token_missing' });
		}
		if (!form.has('phoneNumber')) {
			return fail(400, { error: 'phone_number_missing' });
		}

		const accountSID = form.get('accountSID');
		if (typeof accountSID !== 'string') {
			return fail(400, { error: 'invalid_account_sid' });
		}
		const authToken = form.get('authToken');
		if (typeof authToken !== 'string') {
			return fail(400, { error: 'invalid_auth_token' });
		}
		const {
			success: phoneSuccess,
			data: phoneNumber,
			error: phoneError,
		} = zod.string().regex(PhoneRegex).safeParse(form.get('phoneNumber'));
		if (!phoneSuccess) {
			logger.error(phoneError);
			return fail(400, { error: 'invalid_phone_number' });
		}

		const configs = await prisma.tenantConfig.upsert({
			where: {
				tenantId: tenantId,
			},
			create: {
				tenantId: tenantId,
				accountSID: encrypt(accountSID),
				authToken: encrypt(authToken),
				phoneNumber: encrypt(phoneNumber),
			},
			update: {
				tenantId: tenantId,
				accountSID: accountSID,
				authToken: authToken,
				phoneNumber: phoneNumber,
			},
			select: { accountSID: true, authToken: true, phoneNumber: true },
		});

		return {
			configs: configs,
		};
	},
} satisfies Actions;
