<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<header>
	<div class="navbar">
		<div>
			<h2>Hestia</h2>
		</div>
		<div>
			<h1>{title}</h1>
		</div>
		<div>
			<p>Welcome!</p>
		</div>
	</div>
</header>

<style>
	.navbar {
		@apply flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-2 font-display drop-shadow;
	}

	.navbar h1 {
		@apply text-2xl;
	}

	.navbar h2 {
		@apply text-xl;
	}
</style>
