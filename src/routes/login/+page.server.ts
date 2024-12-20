import { messages } from '$lib/i18n';
import { email_inuse } from '$lib/paraglide/messages';
import { logger } from '$lib/server/logger';
import { auth } from '$lib/server/lucia.js';
import { prisma } from '$lib/server/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { string } from 'zod';

export const actions = {
	login: async (event) => {
		const form = await event.request.formData();
		const email = form.get('email');
		if (typeof email !== 'string') {
			return fail(400, { email: { error: messages.email_required() } });
		}

		const password = form.get('password') as string;
		if (!password) {
			return fail(400, { password: { error: messages.password_required() } });
		}

		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			logger.error(`User not found! ${email}`);
			return fail(404, { email: { value: email, error: messages.user_not_found() } });
		}

		const validPassword = await new Argon2id().verify(user.password, password);
		if (!validPassword) {
			return fail(400, {
				password: { error: messages.password_incorrect() },
			});
		}
		const session = await auth.createSession(user.id, []);
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			maxAge: 120,
		});
		redirect(302, '/');
	},

	register: async (event) => {
		const form = await event.request.formData();
		if (!form.has('email')) {
			return fail(400, { email: { error: messages.email_required() } });
		}
		const { success, data: email, error } = string().email().safeParse(form.get('email'));
		if (!success) {
			logger.error(error);
			return fail(400, { email: { value: email, error: messages.email_incorrect() } });
		}

		const password = form.get('password');
		if (typeof password !== 'string') {
			return fail(400, { password: { error: messages.password_required() } });
		}
		const name = form.get('name');
		if (typeof name !== 'string') {
			return fail(400, { name: { error: messages.name_required() } });
		}

		const usersWithEmail = await prisma.user.count({ where: { email: email } });
		if (usersWithEmail !== 0) {
			return fail(409, { email: { value: email, error: email_inuse() } });
		}

		const hashedPassword = await new Argon2id().hash(password);
		const user = await prisma.user.create({
			data: {
				email: form.get('email') as string,
				name: form.get('name') as string,
				password: hashedPassword,
			},
		});

		const session = await auth.createSession(user.id.toString(), {});
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			maxAge: 120,
		});

		redirect(303, '/');
	},
} satisfies Actions;
