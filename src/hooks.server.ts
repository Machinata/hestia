import { validateSession } from '$lib/server/middleware';
import { sequence } from '@sveltejs/kit/hooks';
import { withClerkHandler } from 'clerk-sveltekit/server';

export const handle = sequence(withClerkHandler(), validateSession());
