import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const yoga = createYoga({ schema });

const server = Bun.serve({ fetch: yoga.fetch });

console.log(`Server is running on: ${server.url}${yoga.graphqlEndpoint}`);
