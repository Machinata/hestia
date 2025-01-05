<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import Loading from './Loading.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Loading',
		component: Loading,
		argTypes: {
			color: {
				control: 'select',
				options: [
					'neutral',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error',
				],
			},
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
			variant: {
				control: 'select',
				options: ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'],
			},
		},
	});
</script>

{#snippet template(props: ComponentProps<typeof Loading>)}
	<Loading {...props} />
{/snippet}

<Story
	name="Default"
	args={{ color: 'neutral', size: 'md', variant: 'spinner' }}
	children={template}
/>
