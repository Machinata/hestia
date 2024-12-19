<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="layout">
	{@render children()}
</div>

<style>
	.layout {
		@apply h-screen w-screen bg-base-100;
	}
</style>