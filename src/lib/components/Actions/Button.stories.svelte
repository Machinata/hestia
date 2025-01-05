<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from '@storybook/test';
	import type { ComponentProps } from 'svelte';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Actions/Button',
		component: Button,
		args: {
			onclick: fn(),
		},
		argTypes: {
			active: { control: 'boolean' },
			animation: { control: 'boolean' },
			block: { control: 'boolean' },
			color: {
				control: 'select',
				options: [
					'neutral',
					'primary',
					'secondary',
					'accent',
					'ghost',
					'info',
					'success',
					'warning',
					'error',
				],
			},
			disabled: { control: 'boolean' },
			full: { control: 'boolean' },
			glass: { control: 'boolean' },
			shape: {
				control: 'select',
				options: ['circle', 'square'],
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', '-', 'lg'],
				defaultValue: 'Default',
			},
			variant: { control: 'select', options: ['link', 'outline'] },
			wide: { control: 'boolean' },
		},
	});
</script>

{#snippet template({ children: _, ...props }: Partial<ComponentProps<typeof Button>>)}
	<Button {...props}>Button</Button>
{/snippet}

<Story name="Default" args={{}} children={template} />
