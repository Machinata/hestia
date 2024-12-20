import { validateSession } from '$lib/server/auth/index.js';

export async function load(event) {
	await validateSession(event);
}