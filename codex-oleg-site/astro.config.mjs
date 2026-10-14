import { defineConfig } from "astro/config";
import { existsSync } from "node:fs";
if (existsSync(".env")) process.loadEnvFile(".env");
const { site } = await import("./src/data/site.js");
export default defineConfig({
  site: site.url || undefined,
  output: "static",
  devToolbar: { enabled: false },
});
