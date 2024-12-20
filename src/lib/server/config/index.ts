import { logger } from '$lib/server/logger';
import { z } from 'zod';

export interface Configuration {
	app_version: string;
}

export const LoadConfig = (): Configuration => {
	const { success, data, error } = z
		.object({
			VITE_APP_VERSION: z.string().default('development'),
		})
		.safeParse(import.meta.env);

	if (!success) {
		logger.error(error.message);
	}

	return {
		app_version: data!.VITE_APP_VERSION,
	};
};

export const Config = LoadConfig();
