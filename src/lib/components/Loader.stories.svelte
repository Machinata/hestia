<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Loader from './Loader.svelte';

	const { Story } = defineMeta({
		title: 'Loader',
		component: Loader,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}} />