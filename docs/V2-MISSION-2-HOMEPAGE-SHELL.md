# V2 Mission 2 — Homepage Shell and Navigation

Date: 2026-07-24
Branch: `claude/lifestar-seo-foundation`
Scope: design tokens, typography, V2 navigation, emergency notice, homepage
structural shell, footer foundation, Spanish readiness. Hero and full
sections arrive in Missions 3 to 6. Service pages untouched.

---

## 1. Architecture

- All V2 code lives in `src/v2/`. V2 styling is scoped under a `.v2` root
  class so V1 pages are untouched during the transition.
- Route-scoped chrome in `src/App.jsx`: the homepage (`/`) renders
  `HeaderV2` + `HomeV2` + `FooterV2`; every other route keeps the V1
  Navbar/Footer and its existing content until Mission 7. The transitional
  inconsistency between homepage and service-page chrome is accepted and
  planned.
- A global skip link (`#main`) and a single `<main id="main">` landmark now
  wrap all routes (V1 pages benefit too).
- `ScrollToTop` now honors URL hashes so in-page anchors (Why Life Star)
  work through client-side navigation.

## 2. Design tokens (`src/v2/tokens.css`)

Single source of truth as CSS custom properties (`--v2-*`): paper/ink/night
surfaces and text colors, brand blue + accessible link blue + sky tint,
hairlines, focus color, serif/sans font stacks, 8-step fluid type scale,
line heights, label tracking, 11-step spacing scale, section rhythm pads,
three container widths, gutter, three radii, one ambient shadow, motion
durations + easing (auto-zeroed under `prefers-reduced-motion`), z-index
layers (header 100, overlay 200, sheet 210, toast 300), tap-target and
header-height metrics. Component CSS references tokens only.

Contrast pairs (WCAG relative-luminance math):
ink on paper 14.6:1, ink-2 on paper 7.0:1, blue-ink on paper 5.4:1,
night-text on night 13.5:1, night-muted on night 7.2:1, ink on brand blue
(primary buttons) 5.7:1. Brand blue never carries body text on paper.

## 3. Font loading

`@fontsource-variable/source-serif-4` and `@fontsource-variable/inter`
(self-hosted woff2, no Google Fonts requests for V2, `font-display: swap`),
imported in `src/main.jsx`. Vite splits per-script subsets with
`unicode-range`, so browsers download only the latin files (~90 kB total
for both variable families). Fallback stacks: Georgia serif / system-ui
sans. Fluid `clamp()` type scale verified at 320 to 1440px with zero
horizontal overflow. V1's Barlow `@import` remains for V1 pages only until
Mission 7 retires it.

## 4. Navigation behavior (`src/v2/Header.jsx`)

- Desktop (≥1024px): serif brand + mark, Services disclosure dropdown
  (`aria-expanded`, `aria-controls`, Escape closes and restores focus to
  the button, click-outside closes), Coverage, Why Life Star (anchor to
  the homepage trust chapter), Contact, phone number, Request Transport
  primary button. Sticky, translucent paper with hairline; no scroll
  listeners, no animation library.
- All interactive targets ≥48px; visible 2px focus ring on every control.

## 5. Mobile navigation behavior

- Burger (48px, `aria-label`, `aria-expanded`) opens a full-screen paper
  sheet: `role="dialog"`, `aria-modal="true"`, body scroll lock, focus
  moves into the sheet, Tab is trapped in a cycle, Escape closes and
  unlocks, route change closes (guarded render-time state adjust, no
  effect cascade).
- Persistent bottom bar (call + request) retained from V1 as the site's
  strongest conversion pattern, restyled to tokens; hidden ≥1024px.
- Verified headless: dialog semantics, scroll lock, focus containment,
  Escape behavior, 48x48 burger.

## 6. Emergency notice

Exact owner-approved copy rendered twice from one content key:
1. A discreet paper-2 strip directly under the header bar (small text,
   ink-2 on paper-2, ~7:1 contrast, no red, no alarm styling).
2. The footer bottom block, ahead of the copyright line.
It also appears inside the mobile menu sheet beneath the call action.
No emergency-dispatch implication anywhere; the homepage FAQ's first answer
repeats the same positioning.

## 7. Footer structure (`src/v2/Footer.jsx`)

Night-navy block: mark + serif wordmark, verified one-line description,
Request Transport CTA, Services column (4 links), Company column (Coverage,
Contact, Request, sitemap.xml link, unlinked "Privacy policy" slot until
that page exists, verified Facebook page link), Contact column (dispatch
number + Edinburg address as currently published), then emergency notice +
dynamic copyright. No hours (per owner), no badges, no ratings, no partner
logos, no insurance marks.

## 8. Facebook integration (owner request, added this mission)

The owner confirmed the page `facebook.com/LifeStarEMSRGV` (screenshot
provided; its listed phone matches the verified dispatch number). Added:
- Footer link (verified social link).
- Homepage "Community" chapter (`08 · Community`) with a click-to-load
  Facebook Page Plugin: nothing loads from Facebook until the visitor
  presses "Show our Facebook feed" (privacy + performance facade; no
  Facebook SDK script, iframe-only, plus a plain "Open our Facebook page"
  fallback link). Verified headless: no iframe before click, plugin iframe
  after click. Note: the feed cannot render inside this sandbox (network
  policy); verify visually on the Vercel preview.

## 9. Spanish readiness

- Every V2 public string lives in `src/v2/content/en.js` (one structured
  object: brand, notice, nav, homepage sections, footer). Components
  import from `src/v2/content/index.js`, the single locale switch point.
- Proposed path (documented, not built): add `es.js` with the same shape,
  a locale context or `/es/*` route prefix that swaps the export, per-locale
  entries in `routeMeta`, and `hreflang` pairs in Mission 10. No language
  switcher yet, per scope.

## 10. Accessibility verification

- Semantic landmarks: `header[role=banner]`, `nav[aria-label]`, single
  `main#main`, `footer[role=contentinfo]`; skip link is the first Tab stop
  (verified).
- Keyboard: full walkthrough headless-verified (skip link → brand → nav →
  dropdown open/Escape/focus-return); mobile sheet trap verified.
- Sections use `aria-labelledby`; decorative marks/arrows `aria-hidden`;
  hidden reviews section is `hidden` + `aria-hidden`.
- Reduced motion: token durations zero out plus a `.v2` kill-switch rule;
  verified via emulation (transition-duration collapses to 0.00001s).
- One h1 on the homepage (hero statement); heading order h1 → h2 per
  section → h3 inside. `/coverage` and `/contact` still lack an h1, a
  pre-existing V1 issue scheduled for Mission 7.

## 11. SEO preservation

Headless sweep across all 8 routes plus an unknown path, production build:
per-route titles, descriptions (exactly one), canonicals, robots, JSON-LD
presence, and 404 noindex/no-canonical all unchanged from the V1.5
foundation. robots.txt, sitemap.xml, manifest, favicons untouched. The
homepage h1 changed text (V1 hero to V2 hero statement) by design;
metadata itself is identical.

## 12. Files changed

New: `src/v2/tokens.css`, `src/v2/v2.css`, `src/v2/content/en.js`,
`src/v2/content/index.js`, `src/v2/Header.jsx/.css`, `src/v2/Footer.jsx/.css`,
`src/v2/HomeV2.jsx/.css`, `src/v2/FacebookFeed.jsx/.css`, this document.
Modified: `src/App.jsx` (route-scoped chrome, skip link, `main#main`),
`src/main.jsx` (font/token imports), `src/index.css` (skip link),
`src/components/ScrollToTop.jsx` (hash anchors), `package.json` (+2
fontsource packages).
Untouched: all `src/pages/*`, all V1 components, all SEO foundation files.

## 13. Tests

- `npm install` clean; `npm run lint` 0 problems; `npm run build` passes
  (JS 511 kB raw; code splitting remains Mission 9 scope).
- Visual: 1440, 1024, 390, 430 (top/bottom screenshots reviewed); zero
  horizontal overflow at every width.
- Keyboard, mobile-menu, reduced-motion, Facebook-facade checks: all pass
  (details above).
- Route + metadata regression: all pass.
- Fixed during testing: `.v2 a` specificity was overriding component link
  colors (blue header/menu links) and the mobile CTA hide rule (squeezed
  burger to 32px); both corrected and re-verified at 48px.

## 14. Preview

Preview deployment URL recorded in the final mission report after push
(same Vercel preview workflow; production untouched).

## 15. Remaining issues

- Hero media panel is a quiet tinted placeholder until PH-01 (Mission 3).
- Why/coverage photo slots are empty panels until Mission 5.
- Facebook plugin rendering must be eyeballed on the preview (sandbox
  cannot reach facebook.com); if Facebook's plugin is ever discontinued,
  fall back to the plain page link.
- "Privacy policy" footer slot is unlinked until the page exists (Mission
  10 dependency, owner/legal input).
- V1 pages still load Barlow via Google Fonts `@import`; retired in
  Mission 7 with the V1 chrome.
