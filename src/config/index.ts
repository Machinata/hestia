import { logger } from '@lib/logger';
import { z } from 'zod';

export interface Configuration {
	app_version: string;
}

export const LoadConfig = (): Configuration => {
	const { success, data, error } = z
		.object({
			APP_VERSION: z.string().default('development'),
		})
		.safeParse(process.env);

	if (!success) {
		logger.error(error.message);
	}

	return {
		app_version: data!.APP_VERSION,
	};
};
