import { yogaLogger } from '$lib/server/logger';
import { Schema } from '$lib/server/pothos';
import type { RequestEvent } from '@sveltejs/kit';
import { createYoga } from 'graphql-yoga';
import { Context } from './context';

export const Yoga = createYoga<RequestEvent>({
	context: Context,
	schema: Schema,
	graphqlEndpoint: '/api/graphql',
	// Let Yoga use sveltekit's Response object
	fetchAPI: { Response },
	logging: yogaLogger
});
