import { prisma } from '@app/prisma';
import { builder } from './builder';

const User = builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		email: t.exposeString('email'),
		name: t.exposeString('name'),
		posts: t.relation('posts'),
	}),
});

const Post = builder.prismaObject('Post', {
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		published: t.exposeBoolean('published'),
		author: t.relation('author'),
	}),
});

builder.queryType({
	fields: (t) => ({
		version: t.string({
			resolve: (parent, args, context) => context.config.app_version,
		}),
		users: t.prismaField({
			type: [User],
			resolve: async () => {
				return await prisma.user.findMany();
			},
		}),
		posts: t.prismaField({
			type: [Post],
			resolve: async () => {
				return await prisma.post.findMany();
			},
		}),
	}),
});

export const schema = builder.toSchema();
