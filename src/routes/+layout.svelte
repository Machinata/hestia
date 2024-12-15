<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="layout">
	{@render children()}
</div>

<style>
	.layout {
		@apply h-screen w-screen animate-fade bg-slate-100;
	}
</style>
