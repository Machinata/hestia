import { PhoneRegex } from '../src/lib/regex/phone';
import { z } from 'zod';

const ValidateEnvironment = () => {
	const { success, error } = z
		.object({
			TWILIO_ACCOUNT_SID: z.string().min(1),
			TWILIO_AUTH_TOKEN: z.string().min(1),
			TWILIO_PHONE_NUMBER: z.string().regex(PhoneRegex),
		})
		.safeParse(process.env);

	if (!success) {
		console.error(error.message);
		process.exit(1);
	}
};

ValidateEnvironment();
