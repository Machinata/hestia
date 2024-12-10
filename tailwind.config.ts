import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				display: ['Baskervville SC']
			}
		}
	},

	plugins: [typography]
} satisfies Config;