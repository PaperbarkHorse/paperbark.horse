// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
    site: "https://paperbark.horse",
    integrations: [svelte(), markdoc()],
    compressHTML: true,
});