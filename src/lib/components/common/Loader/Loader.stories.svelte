<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Loader from './Loader.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Loader',
		component: Loader
	});
</script>

<Story name="Default" args={{}} />