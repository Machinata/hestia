import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				display: ['Baskervville SC']
			},
			animation: {
				fade: 'fadeIn .5s ease-in-out'
			},
			keyframes: {
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				}
			}
		}
	},

	plugins: [typography]
} satisfies Config;
