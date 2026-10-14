import { defineConfig } from "astro/config";
import { existsSync } from "node:fs";
if (existsSync(".env")) process.loadEnvFile(".env");
const { site } = await import("./src/data/site.js");

export default defineConfig({
  site: site.url || undefined,
  output: "static",
  devToolbar: { enabled: false },
  compressHTML: true,
  build: {
    // Small stylesheets are inlined. The main one stays a file, so every page shares one cached copy.
    inlineStylesheets: "auto",
    assets: "_astro",
  },
  vite: {
    css: { transformer: "lightningcss", lightningcss: { targets: { chrome: 100 << 16, safari: 15 << 16, firefox: 100 << 16 } } },
    build: { cssMinify: "lightningcss", target: "es2022", assetsInlineLimit: 0 },
  },
});
