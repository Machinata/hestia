/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-styling-webpack',
		'@storybook/addon-svelte-csf',
		'@storybook/addon-themes',
		'storybook-dark-mode'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	}
};
export default config;