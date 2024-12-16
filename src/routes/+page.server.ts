import { prisma } from '$lib/server/prisma';
import type { Session } from 'lucia';

export async function load(event: Session) {
	const userId = event.userId;
	if (!userId) {
		return {
			authenticated: false
		};
	}
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});
	return {
		authenticated: !!user
	};
}
