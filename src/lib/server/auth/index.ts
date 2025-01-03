import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { prisma } from '../prisma';

export async function validateSession(event: ServerLoadEvent) {
	const sessionId = event.cookies.get('auth_session');
	if (!sessionId) {
		redirect(302, '/login');
	}
	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		include: { user: true },
	});
	if (!session || !session.user) {
		redirect(302, '/login');
	}
	const expiry = session.expiresAt;
	if (dayjs(expiry).isBefore(dayjs())) {
		redirect(302, '/login');
	}
	return session;
}
