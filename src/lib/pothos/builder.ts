import { prisma } from '$lib/prisma';
import type { Context } from '$lib/yoga';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin, { type PrismaTypesFromClient } from '@pothos/plugin-prisma';

type ContextType = ReturnType<typeof Context>;

export const builder = new SchemaBuilder<{
	Context: ContextType;
	PrismaTypes: PrismaTypesFromClient<typeof prisma>;
}>({
	plugins: [PrismaPlugin],
	prisma: {
		client: prisma,
		// defaults to false, uses /// comments from prisma schema as descriptions
		// for object types, relations and exposed fields.
		// descriptions can be omitted by setting description to false
		exposeDescriptions: false,
		// use where clause from prismaRelatedConnection for totalCount (defaults to true)
		filterConnectionTotalCount: true,
		// warn when not using a query parameter correctly
		onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn'
	}
});