import { prisma } from '$lib/server/prisma';
import { builder } from '../builder';

export const Post = builder.prismaObject('Post', {
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		published: t.exposeBoolean('published'),
		author: t.relation('author'),
		createdAt: t.expose('createdAt', {
			type: 'Date',
		}),
		updatedAt: t.expose('updatedAt', {
			type: 'Date',
		}),
	}),
});

const CreatePost = builder.inputType('CreatePost', {
	fields: (t) => ({
		title: t.string({
			required: true,
		}),
		content: t.string({
			required: true,
		}),
		published: t.boolean(),
		authorId: t.id({
			required: true,
		}),
	}),
});

const UpdatePost = builder.inputType('UpdatePost', {
	fields: (t) => ({
		id: t.id({
			required: true,
		}),
		title: t.string(),
		content: t.string(),
		published: t.boolean(),
		authorId: t.id(),
	}),
});

builder.queryFields((t) => ({
	posts: t.prismaField({
		type: [Post],
		resolve: async () => {
			return await prisma.post.findMany();
		},
	}),
}));

builder.mutationFields((t) => ({
	createPost: t.field({
		type: Post,
		args: {
			input: t.arg({ required: true, type: CreatePost }),
		},
		resolve: async (parent, args) => {
			const author = await prisma.user.findUnique({
				where: { id: args.input.authorId },
			});
			if (!author) {
				throw new Error('Author does not exist!');
			}
			const post = await prisma.post.create({
				data: {
					title: args.input.title,
					content: args.input.content,
					published: args.input.published,
					author: {
						connect: {
							id: author.id,
						},
					},
				},
			});
			return post;
		},
	}),
	updatePost: t.field({
		type: Post,
		args: {
			input: t.arg({ required: true, type: UpdatePost }),
		},
		resolve: async (parent, args) => {
			const post = await prisma.post.update({
				where: {
					id: args.input.id,
				},
				data: {
					title: args.input.title ?? undefined,
					content: args.input.content ?? undefined,
					published: args.input.published,
					...(args.input.authorId && {
						author: {
							connect: {
								id: args.input.authorId,
							},
						},
					}),
				},
			});
			return post;
		},
	}),
}));