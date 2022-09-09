import { writable } from 'svelte/store';
import { arrayMoveMutable } from 'array-move';

function createComponents() {
	const { subscribe, update } = writable([{ name: 'Component1' }, { name: 'Component2' }, { name: 'Component3' }]);

	return {
		subscribe,
		move: (fromIndex: number, toIndex: number) => update((n: { name: string }[]): { name: string }[] => {
            arrayMoveMutable(n, fromIndex, toIndex);

			return n;
        })
	};
}

export const components = createComponents();