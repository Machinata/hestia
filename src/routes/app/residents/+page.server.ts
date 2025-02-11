import { PhoneRegex } from '$lib/regex/phone.js';
import { logger } from '$lib/server/logger/index.js';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import zod from 'zod';

export const load = async ({ locals }) => {
	const residents = await prisma.resident.findMany({
		where: {
			tenantId: locals.tenant.id,
		},
		select: {
			id: true,
			name: true,
			phoneNumber: true,
		},
	});

	return {
		residents: residents,
	};
};

export const actions = {
	upsert: async (event) => {
		const form = await event.request.formData();

		if (!form.has('name')) {
			return fail(400, { error: 'phone_missing' });
		}
		if (!form.get('phoneNumber')) {
			return fail(400, { error: 'message_missing' });
		}

		const id = form.get('id');
		if (id && typeof id !== 'string') {
			return fail(400, { error: 'invalid_id' });
		}

		const name = form.get('name');
		if (typeof name !== 'string') {
			return fail(400, { error: 'invalid_name' });
		}

		const {
			success: phoneSuccess,
			data: phone,
			error: phoneError,
		} = zod.string().regex(PhoneRegex).safeParse(form.get('phoneNumber'));
		if (!phoneSuccess) {
			logger.error(phoneError);
			return fail(400, { error: 'invalid_phone' });
		}

		await prisma.resident.upsert({
			where: {
				id: id ?? '',
			},
			create: {
				name: name,
				phoneNumber: phone,
				tenantId: event.locals.tenant.id,
			},
			update: {
				name: name,
				phoneNumber: phone,
			},
		});
	},
	delete: async (event) => {
		const form = await event.request.formData();

		logger.info('Deleting Resident');

		if (!form.has('id')) {
			return fail(400, { error: 'id_missing' });
		}

		const id = form.get('id');
		if (typeof id !== 'string') {
			return fail(400, { error: 'invalid_id' });
		}

		await prisma.resident.delete({
			where: {
				id: id,
			},
		});
	},
};
