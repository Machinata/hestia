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

const CreateUser = builder.inputType('CreateUser', {
	fields: (t) => ({
		email: t.string({
			required: true,
		}),
		name: t.string({
			required: true,
		}),
	}),
});

const UpdateUser = builder.inputType('UpdateUser', {
	fields: (t) => ({
		id: t.id({
			required: true,
		}),
		email: t.string(),
		name: t.string(),
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

builder.mutationFields((t) => ({
	createUser: t.field({
		type: User,
		args: {
			input: t.arg({ required: true, type: CreateUser }),
		},
		resolve: async (parent, args) => {
			const post = await prisma.user.create({
				data: {
					email: args.input.email,
					name: args.input.name,
				},
			});
			return post;
		},
	}),
	updateUser: t.field({
		type: User,
		args: {
			input: t.arg({ required: true, type: UpdateUser }),
		},
		resolve: async (parent, args) => {
			const post = await prisma.user.update({
				where: {
					id: Number(args.input.id),
				},
				data: {
					email: args.input.email,
					name: args.input.name ?? undefined,
				},
			});
			return post;
		},
	}),
}));
