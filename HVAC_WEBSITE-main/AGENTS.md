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

The United Kingdom and Germany sites are mock pages only. On 2026-10-12 the owner asked to give them the same design as the Czech site.
Use them as supporting examples or development references.
Do not treat them as active target markets.
The three markets share one design, one set of components and one content factory (`src/data/content.js`). Czech is still the first priority. Test the Czech site first. Check the UK and Germany pages after each shared change.
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
- `src/styles/atlas-map.css`: Fluid size scale, map layout, and fish-eye lens. It applies to every market.
- `src/styles/atlas-design.css`: The design layer for every market. It sets colour, header, hero, sections, map look, and motion. It loads after `atlas-map.css`.
- `src/styles/atlas-visuals.css`: Line drawings and small visual blocks, for every market. It loads after `atlas-design.css`.
- `src/components/BenefitVisual.astro`, `StepIcon.astro`, `HvacDiagram.astro`: Line drawings (SVG).
- `src/components/SiteMotion.astro`: Small browser script for scroll reveals, header state, the live contour plate and the map readout.
- `src/components/LogoScroll.astro`: The scroll bar made from the logo.
- `src/data/content.js`: `createContent(market)` makes the text for one market. It exports `czechContent`, `ukContent` and `deContent`. Edit the shared text in one place.
- `src/data/scene-kit.js`: Drawing helpers for the city models. `cz-skylines.js`, `scenes-uk-a.js`, `scenes-uk-b.js` and `scenes-de.js` hold the city models of each market.
- `src/data/<market>-contours.json`: Contour lines of each map. `scripts/create-relief.mjs <cz|uk|de>` makes them.
- `public/topo.svg`: Decorative contour field. `scripts/create-topo.mjs` creates it.
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
- Palette (all markets): the logo colours. White, charcoal (`--navy`), a little grey, and coral. Coral is for buttons and small marks only. Do not add blue or warm tints.
- Shapes (all markets): square corners and thin lines, as in the first Atlas design. No pill buttons. No rounded cards. No glow, no shine on buttons. The only round shapes are the map lens, the map markers, and the founder plate (the owner asked for a round plate).
- Map preview: every demo city has a rich card (city model, facts, checks) built from `map.details` in `markets.js`. On a mouse the card is small and sits on the free side of the map. On touch screens or narrow windows it is a sheet from the bottom that closes with its button, a tap outside, a pull down, or Escape. Keep Enter, Space and Escape working, and return focus to the marker. The card names no client, contractor, procurement status or package value.
- Map frame: all markets use the same frame. A wide map (Czech Republic) fills it. A tall map (UK, Germany) sits in the middle (`data-shape="portrait"`). Do not size the frame from the map.
- Drawings: every section should have a visual that explains its content. Use line drawings in the site palette. Put their small labels in `content.js` (`visuals`, `diagram`). Mark drawings `aria-hidden="true"`. The visible text must say the same.
- Draw-in effects use `pathLength="1"` with the `.draw` class. The drawing starts hidden only inside a `[data-reveal]` block that has no `is-in` class.
- A drawing that sits inside a narrow column must use a container query, not a viewport media query.
- Put design styles in `atlas-design.css` and drawing styles in `atlas-visuals.css`. Scope every rule to `body[data-market]`. Use `body[data-market="cz"]` only for a rule that must apply to one market.
- A new market needs: an entry in `markets.js` (map, details, city models, contours), a `createContent` call, and its pages.
- Motion rules: the base style must show the final state. Put the hidden start state in `@keyframes` or in a rule that needs `html.js`. Then the page stays complete when animation is off.
- Scroll reveals use `data-reveal` in the markup. `SiteMotion.astro`
- Pointer effects are limited to hover states and the map. Do not add magnetic or tilt effects.
- Page transitions use `@view-transition` in `BaseLayout.astro`.
- The scroll bar is made from the logo
- Do not add a big decorative word or watermark. It confused the owner.
- Dark sections need an explicit `background-color`. The header script reads it to choose the header tone.
- In `BaseLayout.astro`, the inline script and style use `set:html`. In an `is:inline` tag, plain braces such as `{`...`}` are written as text and do nothing.
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

Regenerate the decorative contour field with:

```sh
node scripts/create-topo.mjs
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
3. Test the Czech site first. Then check the UK and Germany pages, because they share the design.
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

If the dev server says `Failed to load url` for a file that exists, it did not see a new file. Run `npx astro dev stop` and start it again.
Astro uses the next free port when 4321 is busy. `start.bat` opens port 4321. Use the URL that Astro prints.

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
- `public/topo.svg` is made from
- The Czech contour lines in `src/data/cz-contours.json` come from public Terrarium terrain tiles (AWS Terrain Tiles, https://registry.opendata.aws/terrain-tiles/). Regenerate them with `node scripts/create-relief.mjs`. The website does not call the tile server.
- Manrope is bundled locally through `@fontsource-variable/manrope`. It uses the SIL Open Font License.
- The Atlas logo, favicon, and social preview are original brand assets.
- Barbour ABI is a design reference only. Do not reuse its branded assets, text, or graphics.

## Last Recorded Validation

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

After the design update (light palette, square style, line drawings, motion layer, city models, UK and Germany on the same design), these checks were run in desktop Chrome:

- The production build passed.
- The Czech home, sample, about, and contact pages had no horizontal overflow at 1440, 1280, 768, 390, and 320 CSS pixels.
- With reduced motion on, no reveal element stayed hidden and every drawing was fully drawn.
- With scripts off, no reveal element stayed hidden and every drawing was fully drawn.
- After scrolling to the bottom, every reveal element showed and every drawing was drawn, at 1440 and 390 CSS pixels.
- The hotel drawing stacked above its list in the sample page column and on mobile.
- A map marker opened its preview with Enter. Escape closed it and returned focus to the marker.
- The mobile menu opened and closed with Escape and returned focus to its button.
- The skip link showed on first Tab.
- The home, sample, about and contact pages of all three markets had no horizontal overflow at 1440, 1280, 768, 390, and 320 CSS pixels.
- On all three home pages, every reveal element showed after scrolling, with reduced motion on, and with scripts off.
- On the UK and Germany maps, Enter opened the card, Escape closed it, and focus returned to the marker.
- The touch sheet of the map card opened, and closed with its button, a tap outside, and Escape.

These checks were not run: Safari, Firefox, a real touch device, a screen reader, and a frame-rate test on a slow computer.

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
