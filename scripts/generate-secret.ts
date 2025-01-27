import { randomBytes } from 'node:crypto';

console.log('SECRET: ', {
	password: randomBytes(16).toString('hex'),
	salt: randomBytes(16).toString('hex'),
});
