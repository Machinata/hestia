<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from './Textarea.svelte';
	import type { ComponentProps } from 'svelte';

	const { Story } = defineMeta({
		title: 'Data Input/Textarea',
		component: Textarea,
		argTypes: {
			bordered: {
				control: 'boolean',
			},
			color: {
				control: 'select',
				options: [
					'default',
					'ghost',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error',
				],
			},
			disabled: {
				control: 'boolean',
			},
			error: {
				control: 'text',
			},
			label: {
				control: 'text',
			},
			placeholder: {
				control: 'text',
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', '-', 'lg'],
			},
		},
	});
</script>

{#snippet template(props: ComponentProps<typeof Textarea>)}
	<Textarea {...props} />
{/snippet}

<Story name="Default" args={{ label: 'Label' }} children={template} />
