import { prisma } from '$lib/server/prisma';
export async function load(event) {
	console.log(event.cookies.get('user'));
	const userId = event.cookies.get('user');
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
