import { describe, expect, it, vi } from 'vitest';
import { decrypt, encrypt } from './encryption';

describe('Encryption', () => {
	it('should encrypt and decrypt data', () => {
		const data = 'aye its ya boi!';

		vi.mock('$env/static/private', () => ({
			SECRETS_PASSWORD: 'aac7405eb3384e68c285fc252dbf68b2',
			SECRETS_SALT: 'c4aeaf8bda72ea45e8c23269ca849013',
			SECRETS_IV_POSITION: 9,
		}));

		const encrypted = encrypt(data);
		console.log(encrypted);
		const decrypted = decrypt(encrypted);

		expect(decrypted).toEqual(data);
	});
});
