<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { fade, scale } from 'svelte/transition';

	let mode: 'register' | 'login' = $state('login');
	let action = $derived(mode === 'login' ? '?/login' : '?/register');

	function onViewToggle() {
		mode = mode === 'login' ? 'register' : 'login';
	}
</script>

<div class="page">
	<h1 class="underline">Hestia</h1>
	<div class="login">
		<form method="POST" {action} transition:scale>
			<h2 transition:fade>{mode === 'login' ? 'Login' : 'Register'}</h2>
			{#if mode === 'register'}
				<div transition:fade>
					<Input label="Name" name="name" />
				</div>
			{/if}
			<Input label="Email" name="email" type="email" />
			<Input label="Password" name="password" type="password" />
			<div class="flex gap-2">
				<Button
					onClick={onViewToggle}
					label={mode === 'login' ? 'Register' : 'Login'}
					size="large"
					primary
				/>
				<Button type="submit" label="Submit" size="large" />
			</div>
		</form>
	</div>
</div>

<style>
	.page {
		@apply flex flex-col items-center justify-around gap-24 py-[10%];
	}
	.login {
		@apply w-fit max-w-lg animate-fade rounded-lg bg-white p-8;
	}
	.login > form {
		@apply flex w-full flex-col items-center gap-8 rounded-lg;
	}
</style>