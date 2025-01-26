import { PrismaClient } from '@prisma/client';
import { logger } from '../logger';

export const prisma = new PrismaClient({
	log: [{ emit: 'event', level: 'query' }],
});

prisma.$on('query', (event) => {
	logger.debug(`Query [${event.duration}ms]: ${event.query}`);
});
