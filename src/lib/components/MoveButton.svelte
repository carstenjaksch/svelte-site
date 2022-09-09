<script lang="ts">
	import { components } from '$lib/stores';

	export let index: number;
	export let up = true;

	const direction = up ? index - 1 : index + 1;
</script>

{#if (index !== 0 && up) || (index !== $components.length - 1 && !up)}
	<button style="display: block;" on:click={() => components.move(index, direction)}>
		{up ? 'move up' : 'move down'}
	</button>
{/if}
