<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let index: number;
	export let length: number;
	export let up = true;

	const dispatch = createEventDispatcher<{ move: { fromIndex: number; toIndex: number } }>();
	const move = (fromIndex: number, toIndex: number) => {
		dispatch('move', {
			fromIndex,
			toIndex
		});
	};

	const direction = up ? index - 1 : index + 1;
</script>

{#if (index !== 0 && up) || (index !== length - 1 && !up)}
	<button style="display: block;" on:click={() => move(index, direction)}>
		{up ? 'move up' : 'move down'}
	</button>
{/if}
