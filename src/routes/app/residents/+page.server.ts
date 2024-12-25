import { validateSession } from '$lib/server/auth/index.js';
import { prisma } from '$lib/server/prisma/index.js';

export async function load(event) {
	await validateSession(event);

	const residents = await prisma.resident.findMany();

	return {
		residents: residents,
	};
}