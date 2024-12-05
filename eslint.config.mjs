// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// @ts-expect-error No type-def
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
	{ files: ['{app,src}/**/*.{js,mjs,ts}'] },
	{ ignores: ['build/*'] },
	eslint.configs.recommended,
	tseslint.configs.recommended,
	eslintConfigPrettier
);