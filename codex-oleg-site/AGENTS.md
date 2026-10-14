# AGENTS.md

This file gives instructions to coding agents that work in this repository.

## Project Summary

Atlas is a static marketing website for commercial HVAC project intelligence.
It serves three markets:

- United Kingdom at `/`
- Czech Republic at `/cz/`
- Germany at `/de/`

## Market Priority

The Czech Republic site at `/cz/` is the main product.
Focus product, content, design, testing, and improvement work on the Czech site.

The United Kingdom and Germany sites are mock pages only.
Use them as supporting examples or development references.
Do not treat them as active target markets.
Do not copy Czech changes to the UK or Germany pages unless the user asks.
Do not let mock-page consistency limit a better solution for the Czech site.

The site uses Astro 7, JavaScript, Astro components, and custom CSS.
It has no backend, database, account system, or form service.
The production build output is in `dist/`.

## Communication Style

- Use ASD-STE100 Simplified Technical English.
- Use short and simple sentences.
- Use common words.
- Explain one idea at a time.
- Avoid unnecessary technical jargon.
- Be concise and direct.
- Explain a technical term when it is necessary.

## Main Commands

Use Node.js 22.12 or newer. Node.js 24 is preferred.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

There is no test command and no lint command at this time.
Run `npm run build` after each code change.
Do not state that a check passed unless you ran it.

## Important Files

- `src/data/site.js`: Global site name, URL, email, and sitemap routes.
- `src/data/markets.js`: Market names, prices, routes, map data, and shared market content.
- `src/layouts/BaseLayout.astro`: Page shell, metadata, header, and footer.
- `src/components/`: Shared page sections and user interface parts.
- `src/pages/`: Astro routes.
- `src/styles/tokens.css`: Design values such as colors, width, and spacing.
- `src/styles/global.css`: Global layout, components, and responsive rules.
- `src/data/*-path.json`: Generated SVG country paths.
- `scripts/create-map.mjs`: Creates country path files from Natural Earth GeoJSON.
- `public/`: Static assets such as the favicon and social image.

Do not edit `dist/`, `.astro/`, or `node_modules/` by hand.
They are generated folders.

## Architecture Rules

- Keep the site fully static.
- Do not add a backend unless the user asks for one.
- Do not add a client framework for a small interaction.
- Use Astro components for shared markup.
- Use small browser scripts only when they add needed behavior.
- Keep shared market content in `src/data/markets.js`.
- Do not copy a full shared component for each market.
- Use `marketPath()` for market-aware links.
- Use `equivalentMarketPath()` for country switcher links.
- Pass `marketId` to `BaseLayout` on Czech and German pages.
- Add every public page to `routes` in `src/data/site.js`.
- Keep the Czech route set complete and consistent.
- Changes to Czech routes do not require matching UK or Germany routes.

## Content Rules

- The sample opportunity is fictional.
- Never describe it as a verified lead, live tender, or real project.
- Keep the warning text clear on sample pages and cards.
- Separate facts, interpretation, and open questions.
- Do not invent clients, contractors, procurement status, or package values.
- The displayed project value is the total project value. It is not the HVAC package value.
- Keep market names, currencies, prices, and locations consistent with `markets.js`.
- Do not add VAT or tax claims without owner approval.
- Do not add claims about the founder beyond the approved biography in the site.
- Use clear business English. Do not use hype or false urgency.

## Environment and Search Rules

The build can use these environment variables:

- `SITE_URL`: Full HTTPS site origin.
- `CONTACT_EMAIL`: Public contact email address.

Use `.env.example` as the reference.
Do not commit secrets or a real `.env` file.

When `SITE_URL` is empty:

- The site must use `noindex, nofollow`.
- `robots.txt` must block crawling.
- The sitemap must contain no page URLs.
- Canonical and social image URLs must not be emitted.

When `CONTACT_EMAIL` is empty, the contact page must show the preview notice.
It must not pretend that enquiries are collected.

## Design and CSS Rules

- Reuse the values in `src/styles/tokens.css`.
- Keep the current Atlas visual style unless the user asks for a redesign.
- Keep Manrope local through `@fontsource-variable/manrope`.
- Do not add remote fonts, trackers, or third-party map scripts.
- Add responsive rules for all new layouts.
- Check widths at 1440, 1280, 768, 390, and 320 CSS pixels when layout changes.
- Avoid horizontal page overflow.
- Keep the map before the main call-to-action buttons on small screens.
- Preserve the custom `404.html` output.

## Accessibility Rules

- Use semantic HTML before adding ARIA attributes.
- Keep one `h1` on each page.
- Keep heading levels in a logical order.
- Keep keyboard access for every interactive control.
- Keep visible focus styles.
- Keep the skip link.
- The mobile menu must close with Escape and return focus to its button.
- Map markers must work with a pointer, Enter, and Space.
- A map preview must close with Escape and return focus to its marker.
- Mark decorative icons with `aria-hidden="true"`.
- Give useful controls clear accessible names.
- Respect `prefers-reduced-motion`.
- Keep normal text at WCAG AA contrast or better.

## Map Data

The country shapes come from Natural Earth 1:50m Admin 0 data.
The source and licence details are in the Asset Sources and Licences section of this file.

Regenerate a country path with:

```sh
node scripts/create-map.mjs path/to/ne_50m_admin_0_countries.geojson GBR
node scripts/create-map.mjs path/to/ne_50m_admin_0_countries.geojson CZE
node scripts/create-map.mjs path/to/ne_50m_admin_0_countries.geojson DEU
```

Do not hand-edit generated path JSON unless the task requires it.
Do not add a visitor-facing map service or map API without user approval.

## Change Process

Before a change:

1. Read the related component, data file, and style rules.
2. Check `git status`.
3. Preserve unrelated user changes.

During a change:

1. Make the smallest complete change.
2. Keep shared behavior in shared files.
3. Update the Czech site first. Update the UK or Germany mock pages only when the user asks.
4. Keep internal links and section anchors valid.

After a change:

1. Run `npm run build`.
2. Check changed pages at desktop and mobile widths when layout changed.
3. Check keyboard behavior when interaction changed.
4. Check metadata, robots rules, and sitemap when routes or metadata changed.
5. Update the relevant section in this file when setup, behavior, or validation facts change.

## Local Development and Configuration

Use Node.js 22.12 or newer. Node.js 24 is preferred.

Run these commands for local work:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Astro prints the local URL. The site is local only until the owner approves a deployment.
Source business documents stay in the repository root. The production build output is `dist/`.

Edit `src/data/site.js` for the site name, URL, email, and routes.
Edit `src/data/markets.js` for market names, prices, routes, map data, and shared market content.

Supply these values as build environment variables:

- `SITE_URL`: Full HTTPS site origin.
- `CONTACT_EMAIL`: Public contact email address.

Optional `.env` values are loaded by the Astro configuration.
Use `.env.example` as the reference. Never commit secrets or a real `.env` file.

The sample report and map are fictional demonstrations. They are not verified live opportunities.
Founder content is limited to the approved biography. No VAT wording is approved at this time.

## Future Cloudflare Pages Launch

Use a static Cloudflare Pages project if the owner asks for deployment.

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 24
- Server, Worker, and Astro adapter: not required

Set `SITE_URL` and `CONTACT_EMAIL` in the build environment.
Attach the approved custom domain and confirm HTTPS.
The generated `404.html` file supplies the custom not-found page.
Rebuild the site when the contact email or domain changes.

Before launch, get owner approval for the domain, contact email, business copy, and tax or VAT wording.
Then check canonical URLs, social metadata, sitemap URLs, robots rules, and contact links on the deployed domain.

## Asset Sources and Licences

- UK, Czech Republic, and Germany map shapes come from Natural Earth 1:50m Admin 0 countries. The data is public domain.
- Source: `https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson`
- Terms: `https://www.naturalearthdata.com/about/terms-of-use/`
- Generated country outlines are stored in `src/data/`.
- Manrope is bundled locally through `@fontsource-variable/manrope`. It uses the SIL Open Font License.
- The Atlas logo, favicon, and social preview are original brand assets.
- Barbour ABI is a design reference only. Do not reuse its branded assets, text, or graphics.
- Atlas V3 sector images in `public/images/atlas-v3/` were generated with the built-in image generation tool. They are illustrations, not photographs of the fictional sample project. Asset prompts and paths are in `docs/atlas-v3.md`.

## Atlas V3

The owner requested the V3 design for Czech and UK pages. Czech remains the main market. The UK remains a mock market. Germany keeps its previous mock design.

- Czech and UK home, sample, about, and contact pages use one V3 design.
- `src/styles/atlas-v3.css` is independent of the legacy CSS. `BaseLayout` selects one stylesheet per page.
- `AtlasHome`, `AtlasDocument`, `AtlasPilotOffer`, and `AtlasCTA` share the V3 markup.
- `getMarketContent()` in `src/data/markets.js` supplies market-aware V3 content. Prices and sample locations come from the market data.
- V3 does not load the previous size tuner or its saved size values.
- Country links use the existing equivalent-route helper.
- Country outlines and city coordinates use the existing Natural Earth path files and market projections.
- V3 map previews appear below the map. They do not cover its markers.
- On small screens, the map appears before the first main call-to-action buttons.

### V3 validation on 11 October 2026

- `npm run build` passed and produced 13 pages, `404.html`, `robots.txt`, and `sitemap.xml`.
- All eight Czech and UK V3 pages were checked in headless Microsoft Edge at 1440, 1280, 768, 390, and 320 CSS pixels. No horizontal page overflow was found.
- Each checked V3 page had one `h1` and a valid heading sequence. All five image assets loaded.
- All internal links and section anchors on the eight pages resolved. Country switchers marked the correct active market.
- Every interactive Czech and UK marker passed pointer, Enter, Space, Escape, close-button, and focus-return checks. Both mobile menus passed Escape and focus-return checks.
- Rendered outlines matched the existing country path files. All interactive markers were inside their country outline.
- V3 pages did not load the legacy stylesheet. No browser script errors were recorded.
- The local build used `noindex, nofollow`, blocked crawling, emitted no canonical or social image URLs, and had an empty sitemap. Both contact pages showed the pending-contact notice.
- The V3 text colour pairs checked numerically met WCAG AA contrast. Physical-device tests and a screen-reader audit were not done.
- Desktop and mobile screenshots are in the ignored `artifacts/atlas-v3/` directory. The detailed check report is `artifacts/atlas-v3/validation.json`.

The site is still local. It has not been deployed.

## Last Recorded Validation

### UK design previews on 11 October 2026

- Three separate UK landing page designs are at `/uk-designs/minimal/`, `/uk-designs/premium/`, and `/uk-designs/immersive/`. `/uk-designs/` is their comparison page.
- These pages use `UKDesignLayout.astro`, `UKDesignHome.astro`, and `uk-designs.css`. They share existing UK market content and map data.
- Only section navigation is active. Unbuilt full pages and contact actions are disabled. The previews always use `noindex, nofollow`.
- `npm run build` passed and produced 17 pages. All three designs passed layout checks at 1440, 1280, 768, 390 and 320 CSS pixels, with no horizontal overflow or broken images.
- Map keyboard controls, Escape focus return, mobile menu Escape and reduced motion checks passed in headless Edge. No browser script errors were found.
- Details and asset provenance are in `docs/uk-designs.md`. Check output is in the ignored `artifacts/uk-designs/` folder.
- These pages are local previews. No deployment or physical-device test was done.

The last recorded local checks gave these results:

- The production build passed and created the expected static pages, `robots.txt`, and `sitemap.xml`.
- Generated internal links, asset links, and section anchors resolved.
- Each checked page had one `h1`, one title, and one description.
- The homepage was checked at 1440, 1280, 768, 390, and 320 CSS pixels.
- The checked pages had no horizontal overflow.
- On mobile, the map appeared before the main call-to-action buttons.
- The sample, contact, and about pages were checked at 390 CSS pixels.
- The mobile menu closed with Escape.
- Map previews opened with pointer input, Enter, and Space. Escape closed them and returned focus to the marker.
- Normal text colour pairs met WCAG AA contrast in the recorded check.
- Reduced-motion CSS disabled the marker pulse.
- The pilot price appeared on the homepage and contact page.
- No VAT wording was shown.
- A separate test build confirmed canonical URLs, social metadata, sitemap entries, robots rules, and the email link.
- Test-only domain and email values were not present in the delivered local build.
- With no domain, the local build used `noindex`, an empty sitemap, and blocked crawling.
- With no email, the contact page showed the contact-details-pending state.

The site was not deployed when these checks were recorded.
Physical-device touch tests and a screen-reader audit were not done.
Run new checks before you describe the current build as verified.

## Launch Limits

The site is not deployed from this repository workflow.
Do not deploy it or create remote services unless the user asks.
Before a production launch, the owner must provide and approve:

- The final domain.
- The public contact email.
- The final business copy.
- The tax or VAT wording.

Physical device tests and a screen-reader audit are not recorded as complete.
Do not claim that these checks passed without new evidence.
