<script lang="ts">
	async function loadComponent(name: string) {
		return await import(`$lib/components/${name}.svelte`);
	}

	const components = [{ name: 'Component1' }, { name: 'Component2' }];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each components as component}
	{#await loadComponent(component.name) then module}
		<svelte:component this={module.default} />
	{/await}
{/each}
