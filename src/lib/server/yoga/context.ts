import { Config } from '$lib/server/config';
import type { YogaInitialContext } from 'graphql-yoga';

export const Context = (initialContext: YogaInitialContext) => ({
	...initialContext,
	config: Config,
});
