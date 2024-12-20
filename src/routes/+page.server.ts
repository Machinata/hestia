import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const sessionId = event.cookies.get('auth_session');
	if (!sessionId) {
		redirect(303, '/login');
	}
	const user = await prisma.session.findUnique({
		where: {
			id: sessionId,
		},
	});
	if (!user) {
		redirect(300, '/login');
	}
	return {};
}
