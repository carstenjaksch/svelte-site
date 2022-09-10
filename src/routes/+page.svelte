<script lang="ts">
	import { arrayMoveMutable } from 'array-move';
	import MoveButton from '$lib/components/MoveButton.svelte';

	async function loadComponent(name: string) {
		return await import(`$lib/components/${name}.svelte`);
	}

	let components = [{ name: 'Component1' }, { name: 'Component2' }, { name: 'Component3' }];
	let componentsLength = components.length;

	function handleMove(event: CustomEvent<{ fromIndex: number; toIndex: number }>) {
		arrayMoveMutable(components, event.detail.fromIndex, event.detail.toIndex);

		components = components;
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each components as component, index}
	{#await loadComponent(component.name) then module}
		<MoveButton {index} length={componentsLength} on:move={handleMove} />

		<svelte:component this={module.default} />

		<MoveButton {index} length={componentsLength} up={false} on:move={handleMove} />
	{/await}
{/each}
