<script lang="ts">
    import CodeMirror from 'svelte-codemirror-editor';
    import { json } from '@codemirror/lang-json';
    import vegaEmbed from 'vega-embed';
    import { oneDark } from '@codemirror/theme-one-dark';
    import { lineNumbers } from '@codemirror/view';
    import { bracketMatching } from '@codemirror/language';
    import { highlightSelectionMatches } from '@codemirror/search';
    import FullscreenEditorModal from '$lib/FullscreenEditorModal.svelte';
    import { data } from '../state.svelte';

    let chartContainer: HTMLDivElement;

    let isSpecFullscreen: boolean = $state(false);
    let isDataFullscreen: boolean = $state(false);

    function addDefaultSpec(spec: any) {
        spec['width'] = 700;
        spec['height'] = 700;
        return spec;
    }

    function renderChart(): void {
        try {
            const spec: any = addDefaultSpec(JSON.parse(data.spec));
            console.log(spec.data)
            try {
                if (Object.keys(spec.data).length == 0) {
                    spec.data.values = JSON.parse(data.plotData);
                }
            } catch (e) { /* Okay to be empty, or currently editing */ }

            vegaEmbed(chartContainer, spec, { actions: false }).catch((error) => {
                console.error('Error rendering chart:', error);
                alert('Error rendering chart: ' + error.message);
            });
        } catch (e) { /* likely still editing */ }
    }

    $effect(() => {
        renderChart();
    });

    function closeSpecFullscreen() {
        isSpecFullscreen = false;
    }

    function closeDataFullscreen() {
        isDataFullscreen = false;
    }
</script>

<main class="mx-auto p-5">
    <h1 class="mb-6 text-center text-3xl font-bold text-gray-800">Vega-Lite Editor</h1>

    <div class="mb-5 flex gap-5">
        <div class="flex-1">
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-semibold text-gray-700">Vega-Lite Specification</h2>
                <button onclick={() => isSpecFullscreen = true} class="text-blue-500 hover:text-blue-700">
                    Fullscreen
                </button>
            </div>
            <div class="h-96 overflow-auto overflow-x-hidden rounded-md border border-gray-300">
                <CodeMirror bind:value={data.spec} lang={json()} theme={oneDark} extensions={[
                        lineNumbers(),
                        bracketMatching(),
                        highlightSelectionMatches(),
                    ]} />
            </div>
        </div>

        <div class="flex-1">
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-semibold text-gray-700">Plot Data (Json or URL(TODO))</h2>
                <button onclick={() => isDataFullscreen = true} class="text-blue-500 hover:text-blue-700">
                    Fullscreen
                </button>
            </div>
            <div class="h-96 overflow-auto overflow-x-hidden rounded-md border border-gray-300">
                <CodeMirror bind:value={data.plotData} lang={json()} theme={oneDark} extensions={[
                        lineNumbers(),
                        bracketMatching(),
                        highlightSelectionMatches(),
                    ]}/>
            </div>
        </div>
    </div>

    <div class="rounded-md flex justify-center">
        <div bind:this={chartContainer} class="flex justify-center border border-gray-300"></div>
    </div>

    <FullscreenEditorModal
        isOpen={isSpecFullscreen}
        title="Vega-Lite Specification"
        onClose={closeSpecFullscreen}
        editorValue='spec'
    />

    <FullscreenEditorModal
        isOpen={isDataFullscreen}
        title="Plot Data (JSON)"
        onClose={closeDataFullscreen}
        editorValue='plotData'
    />
</main>
