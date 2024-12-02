import { type YogaLogger } from "graphql-yoga";
import pino from "pino";

export const logger = pino();

export const yogaLogger: YogaLogger = {
  debug(...args) {
    // @ts-ignore
    logger.debug(...args);
  },
  info(...args) {
    // @ts-ignore
    logger.info(...args);
  },
  warn(...args) {
    // @ts-ignore
    logger.warn(...args);
  },
  error(...args) {
    // @ts-ignore
    logger.error(...args);
  },
};
