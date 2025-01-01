<script lang="ts">
	import { fade } from 'svelte/transition';
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte';
	import { dark } from '@clerk/themes';
</script>

<div class="page" transition:fade>
	<div>
		<SignIn
			appearance={{
				baseTheme: dark,
				variables: {
					colorPrimary: '#FFF',
				},
				elements: {
					// Remove the sign-up link
					footerAction: { display: 'none' },
				},
			}}
		/>
	</div>
</div>

<style>
	.page {
		@apply flex flex-col items-center justify-around gap-24 py-[10%];
	}
</style>
