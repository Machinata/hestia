import SchemaBuilder from '@pothos/core';

export const builder = new SchemaBuilder({});

builder.queryType({
	fields: (t) => ({
		version: t.string({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			resolve: (parent, args, context) => '1.0.0-alpha'
		})
	})
});

export const Schema = builder.toSchema();