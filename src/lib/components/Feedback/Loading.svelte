<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';

	type Props = {
		color?: Exclude<DaisyColor, 'ghost'>;
		size?: DaisySize | 'md';
		variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
	};
	let { color, size = 'md', variant = 'spinner' }: Props = $props();
</script>

<span
	class="loading"
	class:text-primary={color === 'primary'}
	class:text-secondary={color === 'secondary'}
	class:text-accent={color === 'accent'}
	class:text-info={color === 'info'}
	class:text-success={color === 'success'}
	class:text-warning={color === 'warning'}
	class:text-error={color === 'error'}
	class:loading-xs={size === 'xs'}
	class:loading-sm={size === 'sm'}
	class:loading-md={size === 'md'}
	class:loading-lg={size === 'lg'}
	class:loading-spinner={variant === 'spinner'}
	class:loading-dots={variant === 'dots'}
	class:loading-ring={variant === 'ring'}
	class:loading-ball={variant === 'ball'}
	class:loading-bars={variant === 'bars'}
	class:loading-infinity={variant === 'infinity'}
></span>
