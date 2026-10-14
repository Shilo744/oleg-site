// Prints what a visitor downloads for each page and fails if a limit is passed.
// Usage: node scripts/budget.mjs   (after "npm run build")
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const dist = "dist";
const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const files = walk(dist);
const gz = (file) => gzipSync(readFileSync(file), { level: 9 }).length;
const kb = (n) => (n / 1024).toFixed(1).padStart(6) + " KB";

// Limits are compressed sizes in bytes. A change that passes one needs a reason.
const LIMITS = { html: 20 * 1024, css: 20 * 1024, scriptPerPage: 12 * 1024, fonts: 60 * 1024 };

const shared = {
  css: files.filter((f) => f.endsWith(".css")).reduce((n, f) => n + gz(f), 0),
  js: files.filter((f) => f.endsWith(".js")),
};
let failed = false;
const check = (label, value, limit) => {
  const bad = value > limit;
  if (bad) failed = true;
  console.log(`${bad ? "OVER " : "ok   "} ${label.padEnd(40)} ${kb(value)}  (limit ${kb(limit)})`);
};
console.log("Shared files");
check("stylesheet (all pages share it)", shared.css, LIMITS.css);
for (const f of shared.js) console.log(`      ${f.replace(dist, "").padEnd(40)} ${kb(gz(f))}`);
console.log("\nPages (HTML only)");
for (const f of files.filter((f) => f.endsWith(".html")).sort()) check(f.replace(dist, "") || "/", gz(f), LIMITS.html);
console.log("\nOn demand (cached after the first visit)");
for (const f of files.filter((f) => /maps[\\/]|topo\.svg/.test(f))) console.log(`      ${f.replace(dist, "").padEnd(40)} ${kb(gz(f))}`);
const og = files.find((f) => f.endsWith("og.png"));
if (og) console.log(`\nSocial image (not loaded by visitors): ${kb(statSync(og).size)}`);
process.exit(failed ? 1 : 0);
