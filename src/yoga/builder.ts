import type { Configuration } from "@app/config";
import { prisma } from "@app/prisma";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin, {
  type PrismaTypesFromClient,
} from "@pothos/plugin-prisma";
import type { YogaInitialContext } from "graphql-yoga";

type Context = YogaInitialContext & {
  config: Configuration;
};

export const builder = new SchemaBuilder<{
  Context: Context;
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
