<script lang="ts">
	import { components } from '$lib/stores';
	import MoveButton from '$lib/components/MoveButton.svelte';

	async function loadComponent(name: string) {
		return await import(`$lib/components/${name}.svelte`);
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each $components as component, index}
	{#await loadComponent(component.name) then module}
		<MoveButton {index} />

		<svelte:component this={module.default} />

		<MoveButton {index} up={false} />
	{/await}
{/each}
