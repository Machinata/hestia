import { prisma } from '$lib/server/prisma';
export async function load(event) {
	console.log(event.userId);
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
