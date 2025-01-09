<script lang="ts">
	import ClerkProvider from 'clerk-sveltekit/client/ClerkProvider.svelte';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

	let { children } = $props();
</script>

<div class="layout">
	<ParaglideJS {i18n}>
		<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
			{@render children()}
		</ClerkProvider>
	</ParaglideJS>
</div>

<style>
	.layout {
		@apply h-screen w-screen bg-base-100;
	}
</style>
