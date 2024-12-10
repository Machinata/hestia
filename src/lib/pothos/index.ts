import { Context } from '$lib/yoga/context';
import SchemaBuilder from '@pothos/core';

type ContextType = ReturnType<typeof Context>;

export const builder = new SchemaBuilder<{ Context: ContextType }>({});

builder.queryType({
	fields: (t) => ({
		version: t.string({
			resolve: (parent, args, context) => context.config.app_version
		})
	})
});

export const Schema = builder.toSchema();