import { logger } from "@lib/logger";
import { yoga } from "./yoga";

const server = Bun.serve({
  fetch: yoga.fetch,
  error: (error) => {
    logger.error(error.message);
    return new Response("", {
      status: 500,
      statusText: "You fucked the goose",
    });
  },
});

logger.info(`Server is running on: ${server.url}${yoga.graphqlEndpoint}`);
