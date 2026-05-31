// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { noindexPaths } from "./src/data/noindexPaths.js";

const noindexSet = new Set(noindexPaths);

export default defineConfig({
  site: "https://minimaldev.dev",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !noindexSet.has(pathname);
      },
    }),
  ],
});