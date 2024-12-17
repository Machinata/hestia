<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	type InputProps = {
		label?: string;
		placeholder?: string;
		name: string;
		type?: Extract<
			HTMLInputTypeAttribute,
			'email' | 'password' | 'search' | 'tel' | 'text' | 'url'
		>;
	};

	let { label, type = 'text', ...props }: InputProps = $props();
</script>

<label class="form-control w-full max-w-xs">
	{#if label}
		<div class="label">
			<span class="label-text">{label}</span>
		</div>
	{/if}
	<input {type} {...props} class="input input-bordered w-full max-w-xs" />
</label>

<style>
</style>