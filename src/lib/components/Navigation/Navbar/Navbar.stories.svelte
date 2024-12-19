<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Navbar from './Navbar.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Navbar',
		component: Navbar
	});
</script>

<Story name="Default" args={{ title: 'Storybook' }} />