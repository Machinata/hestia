<script lang="ts">
	let { active, label, onclick } = $props();
</script>

<input aria-label={label} type="radio" role="tab" class="tab" class:tab-active={active} {onclick} />
