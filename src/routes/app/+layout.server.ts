import { validateSession } from '$lib/server/auth';

export const load = async (event) => validateSession(event);
