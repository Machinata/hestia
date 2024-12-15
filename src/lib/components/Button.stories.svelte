<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { fn } from '@storybook/test';

	const { Story } = defineMeta({
		title: 'Button',
		component: Button,
		tags: ['autodocs'],
		args: {
			onClick: fn()
		},
		argTypes: {
			size: {
				control: 'select',
				options: ['small', 'normal', 'large'],
				defaultValue: 'normal'
			},
			backgroundColor: {
				control: 'color'
			},
			primary: {
				control: 'boolean',
				defaultValue: true
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Button', size: 'normal', primary: true }} />
