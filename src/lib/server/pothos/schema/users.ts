import { prisma } from '$lib/server/prisma';
import { builder } from '../builder';

export const User = builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		email: t.exposeString('email'),
		name: t.exposeString('name'),
		posts: t.relation('posts'),
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
			return await prisma.user.findMany();
		},
	}),
}));