<script lang="ts">
    import CodeMirror from 'svelte-codemirror-editor';
    import { json } from '@codemirror/lang-json';
    import { oneDark } from '@codemirror/theme-one-dark';
    import { lineNumbers } from '@codemirror/view';
    import { bracketMatching } from '@codemirror/language';
    import { highlightSelectionMatches } from '@codemirror/search';
    import { data } from '../state.svelte'

    export let isOpen: boolean = false;
    export let title: string = "";
    export let onClose: () => void;
    export let editorValue: 'spec' | 'plotData';

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            onClose();
        }
    }

    $: if (typeof document !== 'undefined' && isOpen) {
        document.addEventListener('keydown', handleKeyDown);
    } else if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleKeyDown);
    }
</script>

{#if isOpen}
    <div class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
        <div class="bg-white rounded-md shadow-lg w-full h-full max-h-screen flex flex-col">
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-xl font-semibold">{title}</h2>
                <button onclick={onClose} class="text-gray-500 hover:text-gray-700" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="flex-1 overflow-auto p-4">
                <CodeMirror
                    bind:value={data[editorValue]}
                    lang={json()}
                    theme={oneDark}
                    extensions={[
                        lineNumbers(),
                        bracketMatching(),
                        highlightSelectionMatches(),
                    ]}
                />
            </div>
            <div class="p-4 border-t border-gray-200 flex justify-end gap-2">
                <button onclick={onClose} class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Close</button>
            </div>
        </div>
    </div>
{/if}