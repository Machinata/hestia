import { messages } from '$lib/i18n';
import { validateSession } from '$lib/server/auth';
import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import zod from 'zod';

export const actions = {
	create: async (event) => {
		const form = await event.request.formData();
		if (!form.has('name')) {
			fail(400, { name: { error: messages.residents_form_error_missing_name() } });
		}
		if (!form.has('phone')) {
			fail(400, { phone: { error: messages.residents_form_error_missing_phone() } });
		}
		if (!form.has('email')) {
			fail(400, { email: { error: messages.residents_form_error_missing_email() } });
		}

		const name = form.get('name');
		if (typeof name !== 'string') {
			return fail(400, { name: { error: messages.residents_form_error_invalid_name() } });
		}
		const {
			success: phoneSuccess,
			data: phone,
			error: phoneError,
		} = zod
			.string()
			.regex(/^(1-)?\d{3}-?\d{3}-?\d{4}$/)
			.safeParse(form.get('phone'));
		if (!phoneSuccess) {
			logger.error(phoneError);
			return fail(400, { phone: { error: messages.residents_form_error_invalid_phone() } });
		}

		const {
			success: emailSuccess,
			data: email,
			error: emailError,
		} = zod.string().email().safeParse(form.get('email'));
		if (!emailSuccess) {
			logger.error(emailError);
			return fail(400, { email: { error: messages.residents_form_error_invalid_email() } });
		}

		const phoneCount = await prisma.resident.count({
			where: {
				phone: phone,
			},
		});
		if (phoneCount > 0) {
			return fail(400, { phone: { error: messages.residents_form_error_inuse_phone() } });
		}

		const emailCount = await prisma.resident.count({
			where: {
				email: email,
			},
		});
		if (emailCount > 0) {
			return fail(400, { email: { error: messages.residents_form_error_inuse_email() } });
		}

		const resident = await prisma.resident.create({
			data: {
				name: name,
				phone: phone,
				email: email,
			},
		});

		return {};
	},
};

export async function load(event) {
	await validateSession(event);

	const residents = await prisma.resident.findMany();

	return {
		residents: residents,
	};
}