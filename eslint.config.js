import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'no-restricted-syntax': [
				'error',
				{
					selector:
						'CallExpression:matches([callee.object.object.name="prisma"], [callee.object.object.name="prismaTransactionClient"], [callee.object.object.name="transactionClient"]):matches([callee.property.name="findFirst"], [callee.property.name="findMany"], [callee.property.name="updateMany"], [callee.property.name="deleteMany"], [callee.property.name="count"], [callee.property.name="aggregate"], [callee.property.name="groupBy"]):not(:has(ObjectExpression > Property[key.name="where"] > ObjectExpression > Property[key.name="tenantId"]))',
					message:
						'Please filter on the current tenant when using findFirst, findMany, updateMany, deleteMany, count, aggregate or groupBy.',
				},
			],
		},
	}
);
