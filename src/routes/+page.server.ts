import { validateSession } from '$lib/server/auth';

export async function load(event) {
	await validateSession(event);
}