import { DATABASE_URL } from '$env/static/private';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { logger } from '../logger';

const connectionString = `${DATABASE_URL}`;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter, log: [{ emit: 'event', level: 'query' }] });

prisma.$on('query', (event) => {
	logger.debug(`Query [${event.duration}ms]: ${event.query}`);
});
