# Codex Plan — UK HVAC Project Intelligence Website

## 1. Overall goal

Build a simple, premium-looking B2B website for a **founder-led UK HVAC Project Intelligence service**.

The primary visual reference is **Barbour ABI**, especially its serious UK construction-industry feeling, dark/navy tones, coral/red accent and project-map concept. Do **not** copy their logo, text, images or site pixel-for-pixel. Create an original brand using the same general design language.

The site should feel:

**serious + British + construction-oriented + data-driven + approachable**

Not:

**generic SaaS + futuristic AI + startup gradients + excessive rounded cards**

---

## 2. Hero — the UK opportunity map is the star

This should be the most memorable part of the website.

Desktop layout:

**Left side**
- Strong headline
- Short explanation
- One primary CTA
- One secondary CTA

Example direction:

**Find UK commercial HVAC projects worth pursuing.**

> We monitor and research upcoming UK projects, then deliver a small number of opportunities matched to your business.

Buttons:

**View a sample opportunity**  
**Join the founding pilot**

**Right side**

A large clean **map of the United Kingdom**.

The map should contain approximately **20–30 small coral/red dots** spread around England, Scotland and Wales.

The meaning should be immediately intuitive:

> each dot = potential commercial project/opportunity.

This should visually resemble the *idea* of Barbour ABI's mapped construction opportunities without duplicating their actual map or interface.

### Map interaction

Keep it simple.

Most dots stay static.

A few dots can subtly pulse.

Hovering over selected dots could reveal a small card such as:

**Hotel Refurbishment**  
Manchester  
£18m project  
Potential mechanical package

or:

**Care Home Expansion**  
Birmingham  
Planning approved  
HVAC scope identified

These can be clearly fictional/demo opportunities initially.

Do **not** build a real mapping backend yet.

Use a lightweight UK SVG with absolutely positioned markers.

---

## 3. Colour system

Take inspiration from Barbour ABI's balance:

**Dark navy / charcoal** — seriousness and construction intelligence  
**White / off-white** — clean space  
**Coral / muted red-orange** — opportunities, CTAs and map points  
**Soft grey** — secondary panels/borders

Suggested direction, not exact Barbour colours:

- Deep navy: `#17212B`
- Dark slate: `#25313D`
- Warm coral: `#F45C52`
- Off-white: `#F7F7F5`
- White: `#FFFFFF`
- Muted grey: `#6F7882`

The coral should be used sparingly.

The website must **not turn orange/red everywhere**.

The point is:

> 85% serious neutral colour  
> 15% energetic opportunity colour.

---

## 4. Typography

Use a modern professional sans-serif.

The typography should feel similar in character to Barbour ABI:

- large, confident headings
- high readability
- fairly bold headlines
- simple body copy
- not playful
- not futuristic/techno

Use one font family, maximum two.

Codex can choose something like:

**Manrope / Inter / Source Sans 3**

Headlines should be large but **not gigantic AI-startup typography** where four words fill the whole screen.

---

## 5. Logo

Do **not** spend a lot of development time on the logo.

Create a simple temporary original mark.

Concept:

> small geometric symbol + business name

Potential inspiration:
- location/project marker
- map/grid
- project/document
- abstract connection between a signal and an opportunity

Use the coral accent in the symbol and dark typography.

Avoid:
- HVAC fan icons
- snowflakes
- flames
- obvious AI brains
- copied Barbour ABI geometry.

The logo should look like a **construction intelligence company**, not an HVAC repair company.

---

## 6. Homepage structure

### Section A — What you receive

Three clean columns:

**Qualified Projects**  
Projects selected for commercial HVAC relevance.

**Project Intelligence**  
Timing, scope, organisations involved and procurement signals.

**Next Action**  
A clear recommendation for what the contractor should investigate or do next.

Keep these visually restrained.

### Section B — From public signal to commercial opportunity

Visually:

**Public project signal**  
→ **Research & qualification**  
→ **HVAC relevance**  
→ **Opportunity delivered to you**

Do not mention crawling, scraping, LLMs or technical architecture.

The customer buys intelligence, not code.

### Section C — Sample Opportunity

Use a realistic card inspired by the Selsdon Park research:

**£30m Hotel Restoration**  
South Croydon

- New heating system reported
- Significant heating works
- Main contractor identified
- Procurement status researched
- Strong commercial HVAC fit

Button:

**View full sample report**

This section supplies the proof that testimonials cannot yet supply.

---

## 7. Founding Client Pilot

Make this visually prominent but not desperate.

Heading:

**Founding Contractor Pilot**

Explain that the business is currently onboarding a small number of UK commercial HVAC contractors.

Example structure:

**4-week pilot**

✓ Three researched opportunities each week  
✓ Personally reviewed  
✓ One deeper project investigation  
✓ No long-term commitment  
✓ Continue only if useful

Display the pilot price openly once we decide it.

This section should communicate:

> **low risk — not low quality.**

---

## 8. Founder section

Small professional photograph eventually.

Text direction:

**Founder-led project intelligence**

Explain honestly:

> Built by a software engineer with professional experience in business intelligence and information-monitoring workflows, now focused on helping UK commercial HVAC contractors identify projects worth pursuing.

Do not fabricate:
- team members
- years of HVAC experience
- customer counts
- testimonials.

The founder-led nature should look deliberate.

---

## 9. Final CTA

Dark navy background.

Very simple.

**Want to see what an opportunity looks like for your business?**

Buttons:

**View sample**  
**Discuss the pilot**

No giant contact form.

---

## 10. Navigation

Keep it minimal:

**Logo | How It Works | Sample Opportunity | Pilot | About | Contact**

No huge mega-menu.

---

## 11. Mobile

Very important.

On mobile:

Headline first  
→ map immediately underneath  
→ CTA  
→ content.

The map must remain understandable and should not become a tiny unusable UK silhouette.

Use fewer markers on narrow screens if necessary.

---

## 12. Anti-“AI slop” rules for Codex

> Do not generate a generic 2026 SaaS landing page.

Avoid:

- gradients
- glowing elements
- purple/blue AI colour schemes
- glassmorphism
- excessive pill badges
- every section inside rounded cards
- giant border radiuses
- floating AI icons
- fake dashboards
- stock photos of smiling office workers
- unnecessary animations
- “Powered by AI” everywhere.

Prefer:

**flat surfaces, strong typography, whitespace, restrained borders, construction/data imagery and the UK opportunity map as the primary visual motif.**

---

## 13. Technology direction

Use:

**Astro + custom CSS + very small amounts of vanilla JavaScript.**

No React.  
No Angular.  
No database.  
No backend.  
No CMS initially.

The UK map should also be **SVG/CSS/JS**, not Google Maps or another heavyweight dependency.

---

## 14. Most important design principle

> **A visitor should understand the product before reading the hero text. The UK map filled with opportunity markers should visually communicate: “We find commercial projects across the UK for you.”**

The map should be the visual anchor of the site and the strongest immediate explanation of the product.
