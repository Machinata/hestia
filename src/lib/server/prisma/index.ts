import { PrismaClient } from '@prisma/client';
import { logger } from '../logger';

export const prisma = new PrismaClient({
	log: [
		{ emit: 'event', level: 'query' },
		{ emit: 'event', level: 'info' },
	],
});

prisma.$on('query', (event) => {
	logger.debug(`Query [${event.duration}ms]: ${event.query}`);
});

prisma.$on('info', (event) => {
	logger.info(event.message);
});
