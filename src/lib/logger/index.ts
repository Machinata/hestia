import { type YogaLogger } from 'graphql-yoga';
import pino from 'pino';

export const logger = pino();

export const yogaLogger: YogaLogger = {
	debug(...args) {
		// @ts-expect-error types dont match
		logger.debug(...args);
	},
	info(...args) {
		// @ts-expect-error types dont match
		logger.info(...args);
	},
	warn(...args) {
		// @ts-expect-error types dont match
		logger.warn(...args);
	},
	error(...args) {
		// @ts-expect-error types dont match
		logger.error(...args);
	}
};