import { logger } from '$lib/server/logger';
import { prisma } from '$lib/server/prisma';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	login: async (event) => {
		const form = await event.request.formData();
		if (!form.has('email')) {
			error(400, 'Email is a required form field!');
		}
		const user = await prisma.user.findUnique({
			where: {
				email: form.get('email') as string
			}
		});
		if (!user) {
			logger.error('User not found! ${user}');
			error(401);
		}
		logger.info(`Login user { email: ${form.get('email')} }`);
		event.cookies.set('user', String(user.id), {
			path: '/',
			maxAge: 120
		});
		redirect(302, '/');
	},
	register: async (event) => {
		const form = await event.request.formData();
		// const user = prisma.user.create({
		// 	data: {
		// 		email,
		// 		name
		// 	}
		// });
		logger.info(`Login user { email: ${form.get('email')}, name: ${form.get('name')} }`);
		redirect(302, '/');
	}
} satisfies Actions;