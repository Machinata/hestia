<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from '@storybook/test';
	import type { ComponentProps } from 'svelte';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Actions/Button',
		component: Button,
		args: {
			onClick: fn(),
		},
		argTypes: {
			block: { control: 'boolean' },
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
					'error',
				],
			},
			full: { control: 'boolean' },
			glass: { control: 'boolean' },
			outline: {
				control: 'boolean',
			},
			responsive: { control: 'boolean' },
			size: {
				control: 'select',
				options: ['Default', 'xs', 'sm', 'lg'],
				defaultValue: 'Default',
			},
			type: {
				control: 'select',
				options: ['button', 'reset', 'submit'],
			},
			wide: { control: 'boolean' },
		},
	});
</script>

{#snippet template({ children: _, ...props }: Partial<ComponentProps<typeof Button>>)}
	<Button {...props}>Button</Button>
{/snippet}

<Story name="Default" args={{}} children={template} />
