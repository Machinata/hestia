import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function load(event) {
	const sessionId = event.cookies.get('auth_session');
	if (!sessionId) {
		redirect(300, '/login');
	}
	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		include: { user: true },
	});
	if (!session) {
		redirect(300, '/login');
	}
	const expiry = session.expiresAt;
	if (dayjs(expiry).isBefore(dayjs())) {
		redirect(300, '/login');
	}

	const { password: _, ...rest } = session.user;
	return rest;
}
