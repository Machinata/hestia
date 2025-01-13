import { prisma } from '$lib/server/prisma';
import { builder } from '../builder';

export const User = builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		email: t.exposeString('email'),
		name: t.exposeString('name'),
		createdAt: t.expose('createdAt', {
			type: 'Date',
		}),
		updatedAt: t.expose('updatedAt', {
			type: 'Date',
		}),
	}),
});

builder.queryFields((t) => ({
	users: t.prismaField({
		type: [User],
		resolve: async () => {
			// TODO: Fix this when we add a tenant context
			// eslint-disable-next-line no-restricted-syntax
			return await prisma.user.findMany();
		},
	}),
}));
