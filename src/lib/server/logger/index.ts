import { NODE_ENV } from '$env/static/private';
import { type YogaLogger } from 'graphql-yoga';
import pino from 'pino';

export const logger = pino({
	//	Only use pino-pretty when NOT production
	...(NODE_ENV !== 'production' && {
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true,
			},
		},
	}),
});

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
	},
};
