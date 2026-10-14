# Technology Plan — UK HVAC Project Intelligence Website

## 1. Core stack

Use **Astro** as the main website framework.

The site is a marketing website, not a web application. Keep the stack intentionally simple:

- **Astro** for pages, routing, layouts and reusable components
- **Custom CSS** for styling
- **Vanilla JavaScript** only for small interactions
- **Static HTML output** wherever possible
- **SVG** for the UK opportunity map and lightweight illustrations
- **Git** for version control
- **Cloudflare Pages** for deployment

Do **not** use React, Angular, Next.js, Vue, Tailwind, a database, backend server or CMS in version 1 unless a real requirement appears.

Priority:

> **fast to build + easy to maintain + visually polished + minimal dependencies**

---

## 2. Why Astro

Astro fits this project because almost all content is static:

- Hero
- UK opportunity map
- How It Works
- Sample Opportunity
- Founding Client Pilot
- Founder / About
- Contact

Astro keeps development close to normal HTML while giving clean components and routing.

Benefits:

- fast loading
- strong SEO foundation
- little JavaScript sent to users
- static hosting
- simple maintenance
- easy expansion later

Do not add React simply for reusable components. Astro components are sufficient.

---

## 3. Suggested project structure

```text
src/
  components/
    Header.astro
    Hero.astro
    UKOpportunityMap.astro
    OpportunityCard.astro
    HowItWorks.astro
    PilotSection.astro
    FounderSection.astro
    Footer.astro

  layouts/
    BaseLayout.astro

  pages/
    index.astro
    sample-opportunity.astro
    about.astro
    contact.astro

  styles/
    tokens.css
    global.css

public/
  images/
  icons/
  maps/
```

Keep the structure clean but do not over-componentize.

---

## 4. Styling

Use **custom CSS**, not Tailwind.

Create a small design-token system with CSS variables for:

- colours
- typography
- spacing
- container widths
- border radius
- shadows

Example:

```css
:root {
  --color-navy: #17212B;
  --color-slate: #25313D;
  --color-coral: #F45C52;
  --color-off-white: #F7F7F5;
  --color-white: #FFFFFF;
  --color-muted: #6F7882;

  --container-width: 1180px;
  --radius-sm: 6px;
  --radius-md: 10px;
}
```

Avoid excessive utility classes, duplicated CSS and inline styling.

The site should look deliberately designed, not template-generated.

---

## 5. Typography

Use a professional web font such as:

- Manrope
- Inter
- Source Sans 3

Prefer one font family unless a second one adds clear value.

Define consistent styles for:

- hero heading
- section heading
- subheading
- body copy
- labels / metadata

Typography and spacing should provide most of the visual quality.

---

## 6. UK opportunity map

This is the main interactive visual element.

Implementation:

- Use a lightweight **SVG map of the United Kingdom**
- Render markers as SVG or positioned HTML elements
- Use CSS for marker styling and subtle pulse effects
- Use minimal vanilla JavaScript for hover/focus/click behaviour
- Some markers may show a small opportunity preview

Do not use:

- Google Maps
- Mapbox
- Leaflet
- GIS APIs
- a map backend

The first version is a **marketing visual**, not a real geographic product.

Demo opportunity data can live in a small local JS/JSON structure.

---

## 7. JavaScript policy

Use as little JavaScript as possible.

Good uses:

- map interactions
- mobile navigation
- FAQ accordion
- optional sample-report modal
- lightweight form behaviour

Avoid JavaScript for:

- layout
- static content
- animations CSS can handle
- unnecessary state management

Do not introduce React because one component is interactive.

---

## 8. Responsive design

Test at least:

- large desktop
- laptop
- tablet
- mobile

Important behaviour:

- hero stacks vertically on smaller screens
- UK map remains useful
- reduce map-marker count on very small screens if necessary
- navigation becomes a simple mobile menu
- CTA buttons remain easy to tap
- cards stack cleanly
- no horizontal overflow

Mobile is a first-class requirement.

---

## 9. Accessibility

Use semantic HTML.

Requirements:

- correct heading hierarchy
- buttons are actual buttons
- links are actual links
- visible keyboard focus
- sufficient contrast
- meaningful alt text
- map interactions usable with keyboard when meaningful
- essential information not available only through hover

---

## 10. SEO

Each page should include:

- unique `<title>`
- meta description
- canonical URL once the final domain exists
- Open Graph metadata
- semantic headings

Also add:

- `robots.txt`
- sitemap
- favicon
- social preview image

Suggested URLs:

```text
/
/sample-opportunity
/about
/contact
```

Do not over-engineer SEO before there is real content.

---

## 11. Performance

Keep the website extremely lightweight.

Rules:

- minimal JavaScript
- compress images
- use modern image formats where practical
- lazy-load below-the-fold images
- no large animation libraries
- no huge UI libraries
- avoid unnecessary third-party scripts

The homepage should feel nearly instant on normal mobile connections.

---

## 12. Assets

Use only original, licensed, public-domain or properly sourced assets.

Do not copy Barbour ABI's:

- images
- illustrations
- icons
- map assets
- logo
- branded graphics

The visual language can be inspired by them, but the assets must be original.

---

## 13. Contact form

Do not build a backend only for contact.

Use either:

1. a lightweight static-form service, or
2. a direct business-email CTA for the first version.

Potential fields:

- Name
- Company
- Work email
- Website
- Message

Add spam protection later if it becomes necessary.

---

## 14. Sample opportunity

The sample report should be accessible without login.

Preferred options:

1. dedicated Astro page
2. PDF download later
3. lightweight modal preview

Do not build:

- customer authentication
- dashboard
- database

just to display a sample report.

---

## 15. Analytics

Analytics are optional at first but useful once outreach starts.

Track only useful events:

- homepage visits
- sample-report clicks
- pilot CTA clicks
- contact submissions

Prefer a lightweight analytics solution.

Do not add multiple marketing trackers without a clear need.

---

## 16. Git workflow

Use **Git** from the beginning.

A simple `main` branch is enough initially.

Commit meaningful milestones:

- initial project structure
- hero + map
- homepage sections
- responsive fixes
- final polish
- deployment setup

Use a proper `.gitignore`.

Never commit secrets or API keys.

---

## 17. Package management

Use **Node.js + npm**.

Keep dependencies minimal.

Before installing any package, ask:

> Does this materially reduce complexity or improve quality?

If the answer is no, do not install it.

---

## 18. Deployment

Deploy as a static site using **Cloudflare Pages**.

Preferred workflow:

```text
Git repository
→ push to main
→ Cloudflare Pages build
→ automatic deployment
```

Requirements:

- custom domain
- HTTPS
- production build
- custom 404 page
- redirects only where needed

No always-running server should be required.

---

## 19. Domain flexibility

Do not hard-code the `.co.uk` domain throughout the project.

Keep site-wide configuration in one place:

- site name
- canonical URL
- contact email
- social links

This should make a future move from `.co.uk` to `.com` easy.

---

## 20. Future expansion

The architecture should allow future features without implementing them now.

Possible future additions:

- plumbing vertical
- electrical vertical
- real project database
- customer login
- personalised opportunity feed
- CRM integration
- automated email reports

Do not build these in version 1.

---

## 21. Anti-overengineering rules

Do not add:

- React
- Angular
- Next.js
- Redux
- state-management libraries
- backend APIs
- authentication
- database
- Docker
- Kubernetes
- microservices
- headless CMS
- complex testing infrastructure
- large component libraries

unless a concrete requirement appears.

The website has one job:

> A UK HVAC contractor receives outreach, opens the website, immediately understands the service, sees proof, understands the low-risk pilot and takes the next step.

Technology should stay invisible.

---

## 22. Final technical principle

> **Choose the simplest implementation that can deliver a premium visual result.**

The quality should come mainly from:

- design
- typography
- spacing
- copy
- responsive behaviour
- polished details

—not framework complexity.

Final stack:

**Astro + custom CSS + vanilla JavaScript + SVG + Git + Cloudflare Pages.**
