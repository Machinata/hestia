<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';

	type Props = {
		bordered?: boolean;
		color?: Omit<DaisyColor, 'neutral'>;
		disabled?: boolean;
		error?: string;
		label?: string;
		size?: DaisySize;
	};
	let { bordered, color, disabled, error, label, size }: Props = $props();
</script>

<label class="form-control w-full max-w-lg">
	<div class="label">
		{#if label}
			<span
				class="label-text"
				class:text-primary={color === 'primary'}
				class:text-secondary={color === 'secondary'}
				class:text-accent={color === 'accent'}
				class:text-info={color === 'info'}
				class:text-success={color === 'success'}
				class:text-warning={color === 'warning'}
				class:text-error={color === 'error' || error}>{label}</span
			>
		{/if}
		{#if error}
			<span class="label-text-alt font-semibold text-error">{error}</span>
		{/if}
	</div>
	<textarea
		class="textarea"
		class:textarea-bordered={bordered}
		class:textarea-xs={size === 'xs'}
		class:textarea-sm={size === 'sm'}
		class:textarea-lg={size === 'lg'}
		class:textarea-ghost={color === 'ghost'}
		class:textarea-primary={color === 'primary'}
		class:textarea-secondary={color === 'secondary'}
		class:textarea-accent={color === 'accent'}
		class:textarea-info={color === 'info'}
		class:textarea-success={color === 'success'}
		class:textarea-warning={color === 'warning'}
		class:textarea-error={color === 'error' || error}
		{disabled}
	></textarea>
</label>