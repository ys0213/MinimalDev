// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    //site: "https://minimaldev.com",
    site: "https://ys0213.github.io/MinimalDev",
    base: "/MinimalDev",
    integrations: [sitemap()],
});
