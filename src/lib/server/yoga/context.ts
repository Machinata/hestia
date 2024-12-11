import { Config } from '$lib/config';
import type { YogaInitialContext } from 'graphql-yoga';

export const Context = (initialContext: YogaInitialContext) => ({
	...initialContext,
	config: Config
});