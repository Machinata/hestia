import { clerkClient } from 'clerk-sveltekit/server';

export const load = async ({ locals }) => {
	const clerkUser = await clerkClient.users.getUser(locals.auth.userId!);

	return {
		user: {
			name: clerkUser.fullName || '',
			hasImage: clerkUser.hasImage,
			imageUrl: clerkUser.imageUrl,
		},
	};
};
