import type { RequestEvent } from '@sveltejs/kit';
import { createSchema, createYoga } from 'graphql-yoga';

export const Yoga = createYoga<RequestEvent>({
	schema: createSchema({
		typeDefs: `
			type Query {
				hello: String
			}
		`,
		resolvers: {
			Query: {
				hello: () => 'SvelteKit - GraphQL Yoga'
			}
		}
	}),
	// Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
	graphqlEndpoint: '/api/graphql',

	// Needed to let Yoga use sveltekit's Response object
	fetchAPI: { Response }
});