import { Schema } from '$lib/pothos';
import type { RequestEvent } from '@sveltejs/kit';
import { createYoga } from 'graphql-yoga';

export const Yoga = createYoga<RequestEvent>({
	schema: Schema,
	graphqlEndpoint: '/api/graphql',
	// Let Yoga use sveltekit's Response object
	fetchAPI: { Response }
});