import { validateSession } from '$lib/server/auth';

export async function load(event) {
	const {
		user: { password: _, ...rest },
	} = await validateSession(event);
	return {
		user: rest,
	};
}
