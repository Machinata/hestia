import type { TwilioConfig } from '@prisma/client';
import { decrypt, encrypt } from '../crypto';

type TwilioCore = Pick<TwilioConfig, 'accountSID' | 'authToken' | 'phoneNumber'>;

export function encryptTwilioConfig({ accountSID, authToken, phoneNumber }: TwilioCore) {
	return {
		accountSID: encrypt(accountSID),
		authToken: encrypt(authToken),
		phoneNumber: encrypt(phoneNumber),
	};
}

export function decryptTwilioConfig({ accountSID, authToken, phoneNumber }: TwilioCore) {
	return {
		accountSID: decrypt(accountSID),
		authToken: decrypt(authToken),
		phoneNumber: decrypt(phoneNumber),
	};
}
