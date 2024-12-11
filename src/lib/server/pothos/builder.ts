import { prisma } from '$lib/server/prisma';
import type { Context } from '$lib/server/yoga';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin, { type PrismaTypesFromClient } from '@pothos/plugin-prisma';
import type { Scalars } from './Scalars';

type PothosType = {
	Context: ReturnType<typeof Context>;
	PrismaTypes: PrismaTypesFromClient<typeof prisma>;
	Scalars: Scalars;
};

export const builder = new SchemaBuilder<PothosType>({
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