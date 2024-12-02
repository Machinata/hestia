import SchemaBuilder from "@pothos/core";
import PrismaPlugin, {
  type PrismaTypesFromClient,
} from "@pothos/plugin-prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const builder = new SchemaBuilder<{
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
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
});

const User = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name"),
    posts: t.relation("posts"),
  }),
});

const Post = builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    published: t.exposeBoolean("published"),
    author: t.relation("author"),
  }),
});

builder.queryType({
  fields: (t) => ({
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
