<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { messages } from '$lib/i18n';
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-8">
	<div class="flex items-center gap-2">
		<h1 class="text-5xl font-bold tracking-widest text-white">
			{page.status}
		</h1>
		<div class="divider divider-horizontal"></div>
		<h1 class="text-2xl font-bold">
			{page.error?.message}
		</h1>
	</div>
	<button onclick={() => goto('/')} class="btn btn-outline btn-neutral btn-wide"
		>{messages.error_page_go_home()}</button
	>
</main>
