// Runs after "astro build". It removes CSS rules that no page can use, then prints the size budget.
// Rules for classes that scripts add (is-open, is-live, ...) and for markup that comes from the map JSON files are kept.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { PurgeCSS } from "purgecss";

const dist = "dist";
const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const files = walk(dist);
const css = files.filter((file) => file.endsWith(".css"));
const content = files.filter((file) => /\.(html|js|json|svg)$/.test(file)).map((file) => ({ raw: readFileSync(file, "utf8"), extension: file.split(".").pop() }));

let before = 0, after = 0;
for (const file of css) {
  const source = readFileSync(file, "utf8");
  before += source.length;
  const [result] = await new PurgeCSS().purge({
    content,
    css: [{ raw: source }],
    keyframes: true,
    fontFace: false,
    variables: false,
    safelist: {
      standard: [/^is-/, /^has-js$/, /^js$/, /^motion-ready$/, /^reveal-off$/, /^pv-/, /^sc-/, /^lens-/],
      greedy: [/data-/, /^scene$/],
    },
  });
  writeFileSync(file, result.css);
  after += result.css.length;
}
console.log(`CSS purge: ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB`);
