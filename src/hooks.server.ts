import { loadUserEnv } from '$lib/server/middleware';
import { sequence } from '@sveltejs/kit/hooks';
import { withClerkHandler } from 'clerk-sveltekit/server';

export const handle = sequence(withClerkHandler(), loadUserEnv());
