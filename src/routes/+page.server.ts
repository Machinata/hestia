import { prisma } from '$lib/server/prisma';

export async function load(event) {
	const userId = event.cookies.get('user');
	if (!userId && isNaN(Number(userId))) {
		return {
			authenticated: false
		};
	}
	const user = await prisma.user.findUnique({
		where: {
			id: Number(userId)
		}
	});
	return {
		authenticated: !!user
	};
}
