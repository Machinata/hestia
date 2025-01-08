import { SECRETS_PASSWORD, SECRETS_IV_POSITION, SECRETS_SALT } from '$env/static/private';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto';

const algorithm = 'aes-256-gcm';
const password = SECRETS_PASSWORD;
const salt = SECRETS_SALT;
const iv_position = Number(SECRETS_IV_POSITION);

function construct(encrypted: string, tag: Buffer, iv: { value: Buffer; position: number }) {
	return `${encrypted.slice(0, iv.position)}${iv.value.toString('hex')}${encrypted.slice(iv.position)}${tag.toString('hex')}`;
}

function deconstruct(encrypted: string, position: number): [Buffer, string, Buffer] {
	const iv = encrypted.slice(position, position + 16);
	const text = `${encrypted.slice(0, position)}${encrypted.slice(position + 16, encrypted.length - 32)}`;
	const authTag = encrypted.slice(encrypted.length - 32);
	return [Buffer.from(iv, 'hex'), text, Buffer.from(authTag, 'hex')];
}

export function encrypt(value: string): string {
	const key = scryptSync(password, salt, 32);
	const iv = randomBytes(8);

	const cipher = createCipheriv(algorithm, key, iv);
	const encrypted = cipher.update(value, 'utf-8', 'hex') + cipher.final('hex');
	const authTag = cipher.getAuthTag();

	return construct(encrypted, authTag, { value: iv, position: iv_position });
}

export function decrypt(value: string): string {
	const key = scryptSync(password, salt, 32);
	const [iv, text, authTag] = deconstruct(value, iv_position);

	const decipher = createDecipheriv(algorithm, key, iv);
	decipher.setAuthTag(authTag);

	return decipher.update(text, 'hex', 'utf-8') + decipher.final('utf-8');
}
