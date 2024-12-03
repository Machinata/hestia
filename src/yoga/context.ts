import { LoadConfig } from "@app/config";
import type { YogaInitialContext } from "graphql-yoga";

export const context = (initialContext: YogaInitialContext) => {
  const config = LoadConfig();
  return {
    ...initialContext,
    config,
  };
};
