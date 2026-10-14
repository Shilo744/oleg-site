# UK landing page design previews

Three complete static Astro landing pages are available at:

- `/uk-designs/minimal/`: warm paper, split hero, clean editorial layout.
- `/uk-designs/premium/`: full-width sunset architecture, system Georgia headings, photo-led pilot.
- `/uk-designs/immersive/`: dark layered surfaces, engineer sector illustration, map glow, reveal motion.

The comparison page is `/uk-designs/`. The main UK, Czech and German routes keep their existing layouts.

`UKDesignHome.astro` shares content and sections. It reads UK values from `markets.js` and the existing localised content. `UKDesignLayout.astro` loads only `uk-designs.css` and local Manrope. There is no client framework or external map service.

Navigation links scroll to sections. Contact, full sample and full about actions are disabled because those pages are not part of these design previews. CZ and DE controls are also disabled. The footer states these limits. The previews always use `noindex, nofollow` and have no canonical or social image URLs.

The map uses the existing Natural Earth UK path and city projection. An expanded view box includes the northern islands. Interactive sample markers use the existing map component. Examples remain fictional and values are total project values.

## Images

New generated hero assets are in `public/images/uk-designs/`. The plant room and rooftop photos are reused from `public/images/atlas-v3/`. All photos are sector illustrations, not evidence of a project. The engineer is a generic illustrative figure, not the founder.

Source images remain in `C:/Users/shilo/.codex/generated_images/01a12aee-8b17-7572-bddd-e6eca25577ae/`:

- Minimal: `exec-95676fea-419b-458c-a203-916521519c3a.png`
- Premium: `exec-56913bbc-9298-4282-97de-81639393f4a8.png`
- Immersive: `exec-1a96e5e6-4b71-4202-bba8-1f7533b27a07.png`

Hero prompt set: each generation used the final corresponding full-page design as a reference and requested a standalone photograph with no UI or text.

- Minimal: pale British limestone facade on the right, St Paul's dome in the left background, green leaves above, daylight, editorial architecture photography, 3:2 composition.
- Premium: ornate British commercial architecture at sunset on the right, distant London, dark open space on the left for HTML copy, cinematic 2:1 composition.
- Immersive: generic engineer seen from behind on the right, hard hat and safety vest, rooftop HVAC and London at dusk, dark open space on the left, cinematic 2:1 composition. No founder portrait.

## Validation on 11 October 2026

The production build passed and generated 17 pages plus robots and sitemap output. All three landing pages were checked in headless Microsoft Edge at 1440, 1280, 768, 390 and 320 CSS pixels. No horizontal overflow, broken image, missing section anchor or browser script error was found. Each has one h1. Mobile menu Escape and focus return, map Enter, Space, Escape, close and focus return passed. Reduced motion disables map animation and reveal effects. Screenshots and the check report are in the ignored `artifacts/uk-designs/` directory.

No deployment or physical-device test was done.
