# oleg site

Versions of the Atlas HVAC project-intelligence website built for Oleg.

| Folder | What it is |
|---|---|
| `HVAC_WEBSITE-main` | Astro site, from the "oleg final site" folder (last build 13.10) |
| `HVAC_WEBSITE-V2` | Astro site, V2 (`atlas-hvac-intelligence-v2`), from the "oleg final site" folder (last build 12.10) |
| `codex-oleg-site` | Astro site, Codex working copy cloned from `Oleg-lafer/HVAC_WEBSITE`, including changes that were never committed |
| `codex-atlas-v2` | Early static Atlas prototype (plain HTML/CSS/JS + `server.js`) |

`node_modules` is left out of every folder.

## Running an Astro version

Needs Node.js 22.12 or newer.

```
cd HVAC_WEBSITE-V2
npm ci
npm run dev
```

On Windows, `start.bat` inside the folder does the same and opens the browser.
