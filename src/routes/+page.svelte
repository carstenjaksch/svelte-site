<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { arrayMoveMutable } from 'array-move';
	import MoveButton from '$lib/components/MoveButton.svelte';

	async function loadComponent(name: string) {
		return await import(`$lib/components/${name}.svelte`);
	}

	const flipDurationMs = 200;
	let dragDisabled = true;

	let components = [
		{ id: 1, name: 'Component1' },
		{ id: 2, name: 'Component2' },
		{ id: 3, name: 'Component3' }
	];
	let componentsLength = components.length;

	const handleMove = (event: CustomEvent<{ fromIndex: number; toIndex: number }>) => {
		arrayMoveMutable(components, event.detail.fromIndex, event.detail.toIndex);

		components = components;
	};
	const handleConsider = (event: CustomEvent<DndEvent>) => {
		const {
			items: newComponents,
			info: { source, trigger }
		} = event.detail;

		components = newComponents as { id: number; name: string }[];

		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
	};
	const handleFinalize = (event: CustomEvent<DndEvent>) => {
		const {
			items: newComponents,
			info: { source }
		} = event.detail;

		components = newComponents as { id: number; name: string }[];

		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}
	};
	const startDrag = (event: MouseEvent | TouchEvent) => {
		event.preventDefault();

		dragDisabled = false;
	};
	const handleKeyDown = (event: KeyboardEvent) => {
		if ((event.key === 'Enter' || event.key === ' ') && dragDisabled) dragDisabled = false;
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div
	use:dndzone={{ items: components, dragDisabled, flipDurationMs }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each components as component, index (component.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<div
				tabindex={dragDisabled ? 0 : -1}
				aria-label="drag-handle"
				class="handle"
				style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
				on:mousedown={startDrag}
				on:touchstart={startDrag}
				on:keydown={handleKeyDown}
			/>
			{#await loadComponent(component.name) then module}
				<MoveButton {index} length={componentsLength} on:move={handleMove} />

				<svelte:component this={module.default} />

				<MoveButton {index} length={componentsLength} up={false} on:move={handleMove} />
			{/await}
		</div>
	{/each}
</div>

<style>
	div {
		position: relative;
	}

	.handle {
		position: absolute;
		top: 0;
		right: 0;
		width: 1em;
		height: 0.5em;
		background-color: grey;
	}
</style>
