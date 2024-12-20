<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	let { children } = $props();
</script>

<div class="layout">
	{@render children()}
</div>

<ParaglideJS {i18n}>
	<style>
		.layout {
			@apply h-screen w-screen bg-base-100;
		}
	</style>
</ParaglideJS>