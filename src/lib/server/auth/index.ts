import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { prisma } from '../prisma';
import { createClerkClient } from '@clerk/express';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { clerkClient } from 'clerk-sveltekit/server';

const clerkSessionClient = createClerkClient({
	secretKey: CLERK_SECRET_KEY,
});

export async function validateSession({ locals }: ServerLoadEvent) {
	if (!locals.auth.userId) {
		return redirect(307, '/login');
	}

	if (!locals.auth.orgId && locals.auth.sessionId) {
		// Sign out the user if they are not associated with an organization
		await clerkSessionClient.sessions.revokeSession(locals.auth.sessionId);
		return redirect(307, '/login');
	}

	const clerkUser = await clerkClient.users.getUser(locals.auth.userId);

	let user = await prisma.user.findFirst({
		where: {
			clerkId: clerkUser.id,
		},
	});

	if (!user) {
		user = await prisma.user.create({
			data: {
				clerkId: clerkUser.id,
				email: clerkUser.emailAddresses[0].emailAddress,
				name: clerkUser.fullName ?? 'Ben the Man',
			},
		});
	}

	return {
		user: { name: user.name },
	};
}
