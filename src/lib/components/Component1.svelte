<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Editor } from 'svelte-tiptap';
	import { createEditor, EditorContent, BubbleMenu } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';

	let editor: Readable<Editor>;

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit],
			content: `<p>Component 1</p>`
		});
	});

	const toggleBold = () => {
		$editor.chain().focus().toggleBold().run();
	};

	$: isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

{#if editor}
	<BubbleMenu editor={$editor}>
		<button on:click={toggleBold} class:active={isActive('bold')}>B</button>
	</BubbleMenu>
{/if}

<EditorContent editor={$editor} />
