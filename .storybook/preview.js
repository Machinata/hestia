import { withThemeByDataAttribute } from '@storybook/addon-themes';
import './preview.css';

/** @type { import('@storybook/svelte').Preview } */
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [
		withThemeByDataAttribute({
			themes: {
				light: 'light',
				dark: 'dark',
				night: 'night'
			},
			defaultTheme: 'dark',
			attributeName: 'data-theme'
		})
	]
};

export default preview;