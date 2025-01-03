<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import Progress from './Progress.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Progress',
		component: Progress,
		argTypes: {
			color: {
				control: 'select',
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
			},
			value: { control: 'number' },
			max: { control: 'number' },
		},
	});
</script>

{#snippet template(props: ComponentProps<typeof Progress>)}
	<Progress {...props} />
{/snippet}

<Story name="Default" args={{}} children={template} />
