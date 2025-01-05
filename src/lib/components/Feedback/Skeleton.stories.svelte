<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Skeleton from './Skeleton.svelte';
	import type { ComponentProps } from 'svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Skeleton',
		component: Skeleton,
	});
</script>

{#snippet template(props: ComponentProps<typeof Skeleton>)}
	<Skeleton {...props} />
{/snippet}

<Story name="Default" args={{ class: 'h-32 w-32' }} children={template} />

<Story name="Circle" args={{ class: 'h-32 w-32 rounded-full' }} children={template} />
