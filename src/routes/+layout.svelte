<script lang="ts">
	import ClerkProvider from 'clerk-sveltekit/client/ClerkProvider.svelte';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
		<div class="layout">
			{@render children()}
		</div>
	</ClerkProvider>
</ParaglideJS>

<style>
	.layout {
		@apply h-screen w-screen p-8;
	}
</style>
