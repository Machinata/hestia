<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="flex h-screen w-full flex-col items-center justify-center bg-[#1d222a]">
	<h1 class="text-9xl font-extrabold tracking-widest text-white">
		{page.status}
	</h1>
	<h1 class="rounded bg-[#FF6A3D] px-2 text-2xl font-bold text-black">
		{page.error?.message}
	</h1>

	<button class="mt-5">
		<a
			class="group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500"
			href="/"
		>
			<span class="relative block border border-current bg-[#1d222a] px-8 py-3">
				Go Home
			</span>
		</a>
	</button>
</main>
