import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	ssr: {
        noExternal: ['vega-embed']
    },
    optimizeDeps: {
        exclude: ["svelte-codemirror-editor", "codemirror", "@codemirror/language-json", "@codemirror/state"],
    },
});
