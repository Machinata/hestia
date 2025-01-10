import { z } from 'zod';

const ValidateEnvironment = () => {
	const { success, error } = z
		.object({
			SECRETS_PASSWORD: z.string().length(32),
			SECRETS_SALT: z.string().min(16),
			SECRETS_IV_POSITION: z.string().transform((val, ctx) => {
				const parsed = parseInt(val);
				if (isNaN(parsed)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Not a number',
					});

					// This is a special symbol you can use to
					// return early from the transform function.
					// It has type `never` so it does not affect the
					// inferred return type.
					return z.NEVER;
				}
				return parsed;
			}),
		})
		.safeParse(process.env);

	if (!success) {
		console.error(error.message);
		process.exit(1);
	}
};

ValidateEnvironment();
