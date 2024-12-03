import { yogaLogger } from "@lib/logger";
import { createYoga } from "graphql-yoga";
import { context } from "./context";
import { schema } from "./schema";

export const yoga = createYoga({
  schema,
  context: context,
  logging: yogaLogger,
});
