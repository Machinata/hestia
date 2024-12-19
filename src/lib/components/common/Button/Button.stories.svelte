<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { fn } from '@storybook/test';

	const { Story } = defineMeta({
		title: 'Button',
		component: Button,
		args: {
			onClick: fn()
		},
		argTypes: {
			color: {
				control: 'select',
				options: [
					'neutral',
					'primary',
					'secondary',
					'accent',
					'ghost',
					'link',
					'info',
					'success',
					'warning',
					'error'
				]
			},
			outline: {
				control: 'boolean'
			},
			size: {
				control: 'select',
				options: ['Default', 'xs', 'sm', 'lg'],
				defaultValue: 'Default'
			},
			type: {
				control: 'select',
				options: ['button', 'reset', 'submit']
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Button', color: 'primary' }} />