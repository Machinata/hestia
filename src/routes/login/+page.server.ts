import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma';
import { error, redirect, type Actions } from '@sveltejs/kit';
//import { password } from 'bun';
import { Argon2id } from "oslo/password"
import { generateId } from 'lucia';
import { auth } from '$lib/server/lucia.js';

export const actions = {
	login: async (event) => {
		const form = await event.request.formData();
		if (!form.has('email')) {
			return error(400, 'Email is a required form field!');
		}
		const user = await prisma.user.findUnique({
			where: {
				email: form.get('email') as string
			}
		});
		if (!user) {
			logger.error('User not found! ${user}');
			return error(401);
		}
		event.cookies.set('user', String(user.id), {
			path: '/',
			maxAge: 120
		});
		redirect(302, '/');
	},
	register: async (event) => {
		const form = await event.request.formData();
		if (!form.has('email') || !form.has('name') || !form.has('password')) {
			return error(400);
		}
		const hashedPassword = await new Argon2id().hash(form.get('password') as string)
		const user = await prisma.user.create({
			data: {
				email: form.get('email') as string,
				name: form.get('name') as string,
				password: hashedPassword
			}
		});
		const session = await auth.createSession(user.id.toString(), {});
		const sessionCookie = auth.createSessionCookie(session.id);
		if (!user) {
			return error(500);
		}
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			maxAge: 120
		});
		redirect(302, '/');

	}
} satisfies Actions;