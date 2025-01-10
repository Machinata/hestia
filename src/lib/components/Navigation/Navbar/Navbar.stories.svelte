<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Navbar from './Navbar.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Navbar',
		component: Navbar,
	});
</script>

<Story name="Default">
	<Navbar>
		{#snippet start()}
			<button class="btn">Home</button>
		{/snippet}
		{#snippet center()}
			<h2 class="text-xl">Title</h2>
		{/snippet}
		{#snippet end()}
			<div class="avatar placeholder">
				<div class="w-8 rounded-full bg-neutral text-neutral-content">
					<span class="text-xs">UI</span>
				</div>
			</div>
		{/snippet}
	</Navbar>
</Story>
