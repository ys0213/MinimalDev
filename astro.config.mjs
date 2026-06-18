// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { noindexPaths } from "./src/data/noindexPaths.js";

/**
 * @param {string | URL} path
 * @returns {string}
 */
const normalizePath = (path) => {
  const pathname = new URL(String(path), "https://minimaldev.dev").pathname;

  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
};

const noindexSet = new Set(noindexPaths.map(normalizePath));

export default defineConfig({
  site: "https://minimaldev.dev",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = normalizePath(page);
        return !noindexSet.has(pathname);
      },
    }),
  ],
});