# Theme-Consistency Audit & Pediatric Visual Identity Restoration

Ran on branch `claude/lifestar-real-photography-leadership` while PR #2
("Real Photography, About Page, and Woman-Owned Leadership") was paused,
pre-merge, at the owner's request. **PR #2 was not merged, master was not
touched, and the source branch was not deleted.**

This document covers two missions on the same branch:
- **Part 1** (§1–§15 below): converted every legacy-dark page body onto
  V2 tokens and restored a rocket/star/planet pediatric identity.
- **Part 2** (§16 at the end): a full visual migration removing the
  remaining large dark-navy sections sitewide (footer, homepage and
  Government Contracting CTA/content bands) and replacing the pediatric
  rocket theme with an ocean theme per revised owner direction.

## 1. Route inventory — before / after (Part 1)

Every route registered in `src/App.jsx`, plus everything reachable from
desktop nav, mobile nav, homepage, service cards, footer, and forms.

| Route | Component | Before | After |
|---|---|---|---|
| `/` | HomeV2 | Fully V2 | Unchanged (already compliant) |
| `/about` | About | Fully V2 | Unchanged (already compliant) |
| `/government-contracting` | GovernmentContracting | Fully V2 | Unchanged (already compliant) |
| `/coverage` | CoveragePage → CoverageMap | Partially V2 (V2 intro, dark-navy body/sidebar) | Fully V2 (sidebar chrome on paper tokens; SVG map kept as one contained dark panel — see §6) |
| `/contact` | ContactPage → Contact | Partially V2 (V2 intro, dark-navy form) | Fully V2 |
| `/request` | RequestCoverage | Partially V2 (V2 intro, dark-navy form + sidebar) | Fully V2; also fixed a heading-order skip (§8) |
| `/services/dialysis` | DialysisTransport | Partially V2 (V2 intro, dark-navy body) | Fully V2 |
| `/services/therapy` | TherapyTransport | Partially V2 (V2 intro, dark-navy body **plus** a full space/nebula/orbit/alien theme) | Fully V2; space theme removed (see §9 for why) |
| `/services/pediatrics` | PediatricsTransport | Partially V2 (V2 intro, dark-navy body; only one static rocket icon survived from the original pediatric theme) | Fully V2; restrained rocket/star/planet motif restored (§7) |
| `/services/events` | EventStandby | Partially V2 (V2 intro + real photo, dark-navy body) | Fully V2; photo work from the prior mission preserved untouched |
| `/services/long-distance` | LongDistanceTransport | **Legacy V1** — the only page with a fully custom hero, no `InnerPage` at all, and an active "galaxy highway" warp/star-field theme | Fully V2; restructured onto the shared `InnerPage` pattern like every sibling service page (§10) |
| `*` (404) | NotFound | Fully V2 | Unchanged (already compliant) |

Non-page items checked and found correct, not broken:
- Footer "Sitemap" → `/sitemap.xml` (static file, correct as-is)
- Footer "Privacy policy" → intentionally not a link yet (no privacy page written; decision from `docs/SEO-FACT-VERIFICATION.md`)
- Bare `/services` — not registered, not linked anywhere live; correctly falls through to the 404 page

## 2. Pages that required conversion

Dialysis, Therapy, Pediatrics, Events, Long-Distance, Request, Coverage,
Contact — 8 of 12 live routes. Home, About, Government Contracting, and
404 were already fully V2 and needed no changes.

## 3. Files changed

19 files, +445/−706 lines (net smaller, mostly from removing the Therapy
and Long-Distance space themes):

- `src/index.css` — legacy `.label`/`.title`/`.subtitle`/`.btn*` classes
  (still used by every "legacy" page body) redefined on V2 tokens instead
  of the old dark-navy V1 palette; base `body` background/color switched
  from navy to V2 paper.
- `src/v2/InnerPage.jsx`, `src/v2/InnerPage.css` — the `.v2page-legacy`
  content band now renders on V2 paper and is wrapped in the `.v2` scope,
  so every legacy page body inherits V2 typography, focus styles, and
  (importantly) the sitewide `prefers-reduced-motion` rule automatically.
- `src/pages/ServicePage.css` — the shared stylesheet behind Dialysis,
  Therapy, Pediatrics, Events, and Long-Distance — reskinned to V2 tokens.
  CTA banners (`.sp-cta-banner`) were kept as one deliberate dark "night"
  chapter, matching the pattern already established on the homepage.
- `src/pages/DialysisTransport.css`, `EventStandby.css`,
  `RequestCoverage.css`/`.jsx`, `TherapyTransport.css`/`.jsx`,
  `PediatricsTransport.css`/`.jsx`, `LongDistanceTransport.css`/`.jsx` —
  page-specific reskins (see §2 and §7/§9/§10 for the notable ones).
- `src/components/Contact.css`, `src/components/CoverageMap.css`/`.jsx`
  — reskinned; CoverageMap's CTA label clarified (§5).
- `src/v2/Footer.jsx` — accessibility fix, not a theme change (§8).
- `src/v2/content/en.js` — added a `pages.longDistance` intro entry so
  Long-Distance could use the shared `InnerPage` pattern.

## 4. Pediatric assets restored — what and why

The owner asked for the rockets and icons "previously used" on the
pediatric page to come back. See §7 for the full account, but in short:
**not a literal revert.** The old full-screen space hero (dark gradient,
dense star field, spinning planets, floating alien/moon/sparkle) was
found, in git history, to have been *deliberately and documentedly*
removed by an earlier "Mission 2B" rebrand — four planning docs explicitly
forbid it (§9). The new treatment reuses the same motifs (rocket, stars,
small planets, a flight path) at a fraction of the visual weight, built
fresh against the current V2 token system rather than reverted from the
old dark theme.

## 5. Navigation findings

- **`/services/long-distance` has no in-app link.** It's registered in
  `App.jsx` and listed in `public/sitemap.xml`, but no live nav item,
  homepage card, or footer link points to it — the only components that
  ever linked to it (`LongDistanceCities.jsx`, `LongDistance.jsx`) are
  themselves orphaned V1 components not imported anywhere reachable. The
  nav's actual "long-distance" story is folded into
  `/services/pediatrics` via the label "Pediatric and long-distance
  transportation." This is a real, findable inconsistency — the page is
  indexable but has no discovery path in the app — but changing primary
  nav structure is explicitly out of scope for this mission ("do not make
  a major navigation change without documenting it"). **Recommendation:**
  the owner should decide whether `/services/long-distance` gets a nav
  entry of its own (splitting it clearly from the pediatric-specific
  long-distance service), gets linked from `/coverage` or the pediatric
  page as a secondary "general long-distance transport" link, or is
  retired/redirected. No nav change was made in this mission.
- **"Pediatric/Long-Distance" label check** (the specific concern named
  in the mission brief): the live label is `Pediatric and long-distance
  transportation` → `/services/pediatrics` (`src/v2/content/en.js`), which
  already reads clearly as one combined pediatric service, not two
  separate things — no change needed there.
- **CoverageMap CTA label fixed:** the long-distance zone's button read
  "Long-Distance Transport →" while linking to `/services/pediatrics` and
  sitting under a paragraph that says "Long-distance **pediatric**
  transport statewide." The destination was already correct (confirmed
  intentional consolidated IA from an earlier mission); only the visible
  button text was vague. Changed to "Pediatric Long-Distance Transport →"
  so the button text matches its destination without a route change.
- No dead or legacy-design links were found on any live route.

## 6. CoverageMap — one deliberate dark panel, not a full reskin

The inline SVG map (`src/components/CoverageMap.jsx`) has its dot, label,
and gradient colors hand-tuned for a dark background; re-theming its
internals for a light background risked breaking contrast/visibility for
no real gain. Decision: keep `.covmap-svg-wrap` as a contained dark
"night" panel — the same pattern already used for `.sp-cta-banner` and
the homepage's operations band — while converting the surrounding header,
sidebar zone cards, and contact card to V2 paper tokens. The map itself
was not touched.

## 7. Pediatric visual identity — restored treatment

**Where the old design came from:** git history (`git log --all`) traces
the original rocket/star/planet pediatric theme through commits `e694d29`
→ `cb075dc` → `e704a39` → `5a5609c` → `93b36c6` → `2486339` ("V10 Final"),
all from 2026‑04‑14, and it's still intact today on `master` and
`claude/lifestar-ems-audit-iuemy7`. It was removed from the V2 rebrand
lineage in commit `7ff4339` ("Mission 2B"). `PediatricsTransport.css`
still carried the fully-defined but orphaned CSS for it
(`.peds-hero`, `.peds-stars`, `.peds-planet1`/`2`, `.pf-rocket`,
`.pf-star1`/`2`, `.pf-globe`) — unused by the JSX, but exactly where the
old design's shapes and motion curves came from.

**What's new:** a decorative band (`.peds-sky-art`) in the page intro,
rendered via `InnerPage`'s `media` slot — the same slot other pages use
for photography — containing:
- two small soft-colored "planet" circles (muted amber, muted green)
- two small `FaStar` icons
- a dashed line suggesting a flight path
- one `FaRocket`, muted brand blue, with a single slow (6s) float

Everything in the band is `aria-hidden="true"`; the CTA-banner rocket and
the "Free Evaluation" heart icon also got `aria-hidden="true"` since
they're decorative accents next to real text, not information carriers.
Card icon colors across the page were moved from the original neon
palette (`#48DBFB`, `#A78BFA`, `#34D399`, `#FB923C`) to calmer, muted
equivalents to read as professional rather than playful.

## 8. Accessibility results

Full sweep at 375px/1440px across all 12 live routes
(`h1` count, heading-level order, decorative `aria-hidden`):

- **Every route has exactly one `h1`.**
- **Two heading-order skips found and fixed:**
  - `FooterV2`'s four column headings were `<h4>` with no `<h3>` present
    on most pages — a sitewide skip. Bumped to `<h3>` (styled by class,
    not tag, so no visual change).
  - `RequestCoverage`'s five sidebar info-box headings were `<h3>`
    siblings of the page `h1` with no `h2` in between. Bumped to `<h2>`,
    matching the form's own success-state heading (already `h2`).
  - After both fixes, 11 of 12 routes have a clean heading sequence. The
    404 page still goes `h1` → footer `h3` with nothing in between,
    because the page has no body content of its own by design. Documented
    here as a minor, low-impact known limitation rather than inserting an
    artificial heading into a one-paragraph error page.
- **Reduced motion:** verified with Playwright's `reducedMotion: 'reduce'`
  emulation — the pediatric rocket, CTA-banner rocket, and heartbeat icon
  all collapse to ~0ms animation duration, via the sitewide
  `.v2 * { animation-duration: 0.01ms !important; ... }` rule in
  `src/v2/v2.css`. This rule now also covers every legacy page body,
  because `InnerPage`'s legacy wrapper was changed to render inside the
  `.v2` scope (§3) — a side benefit beyond the pediatric page itself.
- Decorative pediatric elements (`.peds-sky-art`, banner rocket, CTA
  heart) are `aria-hidden`; all service/trust information on the page
  remains real HTML text, unaffected by the decoration.

## 9. Why the Therapy page's space theme was removed, not kept

`TherapyTransport.css`/`.jsx` had an even larger space theme than the old
pediatric page — dense star fields, shooting stars, three nebula glows, a
rocket, two planets, a spinning moon, an alien emoji, sparkle effects, and
an orbit ring with a spinning dot. Four V2 planning docs
(`docs/V2-CREATIVE-DIRECTION.md`, `docs/V2-DESIGN-SYSTEM.md`,
`docs/V2-PHOTOGRAPHY-PLAN.md`, `docs/V2-PAGE-ARCHITECTURE.md`) explicitly
call this style out as forbidden — "star fields, nebulas, rockets, emoji
as UI" are listed as "Explicitly out," citing both a
consumer-app-not-medical-transport tone problem and real performance/
accessibility cost. The mission brief's own pediatric constraints (no
daycare/cartoon feel, sparing decorative use, hidden from assistive tech,
respect reduced motion, no distracting continuous animation) echo those
same concerns. Since the brief asked specifically for the **pediatric**
identity to come back, not a general space theme across services, Therapy
was converted to a plain V2 card layout with a light blue accent — keeping
its own personality through color and content, not through a second full
space theme running alongside pediatric's more restrained one.

## 10. Long-Distance page restructure

`LongDistanceTransport.jsx` was the only service page not built on
`InnerPage` — a fully custom hero with its own warp-speed star trails, a
moving star field, and a spinning globe emoji. Restructured onto the same
`InnerPage` + shared `.sp-*` pattern as every sibling service page (a new
`content.pages.longDistance` entry was added for its intro copy), and the
warp/star-field hero was dropped for the same reasons as §9. Its form,
city list, and BLS-only crew copy (no ALS claim — already correct from an
earlier mission) were preserved as-is.

## 11. Pediatric content safety (Phase 4)

Reviewed `/services/pediatrics` copy against the mission's constraints:
no neonatal-capability claim, no specialty clinical credential claim, no
response-time guarantee, no ALS-provider licensing claim, and no
guaranteed-coverage or guaranteed-outcome language appear anywhere on the
page. "Free Evaluation" and "Insurance accepted — verified before first
trip" are the only offer-style statements, and both were already present
before this mission. No copy changes were needed.

## 12. Responsive results

Full sweep at 375px and 1440px across all 12 live routes (Playwright,
`document.documentElement.scrollWidth` vs `clientWidth`): **zero
horizontal overflow on any route at either width.** No clipped icons, no
rocket/text overlap, no distorted images, no old-theme remnants. (320,
390, 768, and 1920px were exercised in the immediately-preceding PR #2
pre-merge gate on this same branch and are unaffected by this mission's
CSS-token-only changes to shared layout widths.)

## 13. Lint and build

- `npm run lint` — 0 problems, both before and after the accessibility
  follow-up commit.
- `npm run build` — succeeds; only the pre-existing informational
  >500 KB chunk-size notice (unrelated to this mission).
- No new console errors on any route (verified with Playwright; the only
  console entries seen were from a deliberate test-harness block of
  `fonts.googleapis.com` used to work around an unrelated, pre-existing
  network flake — see §14).

## 14. Known non-blocking follow-ups (not fixed in this mission)

- `src/index.css` still `@import`s Google Fonts CSS from
  `fonts.googleapis.com` at the top of the stylesheet — a render-blocking
  external request that was intermittently slow/unresponsive in this
  sandbox's network during verification (unrelated to any code in this
  mission; pre-existing). Worth a future look at self-hosting the fonts
  or using `<link rel="preconnect">` + non-blocking loading.
  `/services/long-distance` has no in-app link — see §5.
- A number of confirmed-orphaned V1 components remain in
  `src/components/` (`Hero`, `Navbar`, `Footer` (V1), `Gallery`,
  `Insurance`, `About` (V1, distinct from the live `src/pages/About.jsx`),
  `EmergencyBar`, `FloatingNav`, `Services`, `LongDistance`,
  `LongDistanceCities`, `Coverage` (V1, distinct from the live
  `CoverageMap.jsx`)) — none imported by `App.jsx` or anything reachable
  from it. Left untouched per the mission's explicit "do not delete
  legacy components without documenting" instruction; cleanup remains a
  separate future mission.
- `photo-3.jpg` and the `heather-ayala-segovia-seated-full` derivative
  remain unused (carried over from the prior Real Photography mission's
  known follow-ups).

## 15. Confirmation

- Master/production: unaffected. `origin/master` remains at
  `eee2834b0220783ab0a77455f514588ae96cb09e` throughout.
- PR #2: remains open, unmerged, `mergeable_state: clean`.
- Source branch `claude/lifestar-real-photography-leadership`: not
  deleted; this mission's commits were pushed to it.

---

## 16. Part 2 — full visual migration + pediatric ocean theme

A follow-up mission on the same branch. The owner's finding: even after
Part 1, the site still mixed light V2 chrome with several large dark-navy
sections (footer, a couple of full-bleed CTA/content bands on the
homepage and Government Contracting), and asked for the pediatric page's
rocket/space treatment to be replaced with an ocean theme instead.
**PR #2 was not merged, master was not touched, source branch not
deleted.**

### 16.1 Route inventory — before / after (Part 2)

| Route | Before this pass | After |
|---|---|---|
| `/` | Fully V2 chrome, but two full-width `var(--v2-night)` sections: the "Crew and operations" content band and the bottom CTA band | Operations section now light paper (matches surrounding sections); CTA band is a compact rounded dark card inside a light section, not a full-bleed band |
| `/government-contracting` | Fully V2 chrome, but two full-width `var(--v2-night)` sections: the "Identifiers and codes" content band and the final CTA band | Identifiers section now light paper (its card grid reskinned to light tokens); final CTA is a compact dark card, same pattern as home |
| `/services/dialysis`, `/services/therapy`, `/services/pediatrics`, `/services/events`, `/services/long-distance` | Each had a full-width `var(--v2-night)` CTA banner section | Shared `.sp-cta-banner` redesigned once (`src/pages/ServicePage.css`): the section itself is now light paper, and only the inner `.container` becomes a compact rounded dark card — applies to all five pages automatically |
| `/coverage` | Sidebar/header already light from Part 1; SVG map panel and its small contact chip still intentionally dark | Unchanged — see §16.4 for why; also fixed a real `320px` horizontal-overflow bug in `.covmap-layout`'s mobile grid (bare `1fr` → `minmax(0,1fr)`, the same "grid auto-min-content" bug class fixed elsewhere in this codebase before) |
| Sitewide footer | Full-width dark "brand block" (`v2-night`), present on every route | Redesigned light — see §16.2 |
| `/services/therapy` | Blue accent (`--v2-blue`) | Shifted to a soft aqua accent (`#12A3AD`) to visually coordinate with the new pediatric ocean palette, without adding any ocean decoration to Therapy itself (§16.5) |

All other routes from the Part 1 table are unaffected by this pass.

### 16.2 Footer redesign

`src/v2/Footer.jsx` no longer wraps itself in `.v2-night` — `src/v2/Footer.css`
was rewritten from dark tokens (`--v2-night-text`, `--v2-night-muted`,
`--v2-hairline-night`) to light ones (`--v2-paper-2` background, `--v2-hairline`
top border, `--v2-ink`/`--v2-ink-2` text, `--v2-blue-ink` for the phone
number and link hovers). All link groups, the dispatch phone, the
Government Contracting links, and the emergency disclaimer are unchanged
in content — only color tokens moved. The mobile-bar clearance padding
(`calc(var(--v2-s-5) + 56px)` on `.v2f-bottom`, dropped back to `--v2-s-5`
at ≥1024px where the bar is hidden) was left exactly as-is; it's
independent of color and still correct (verified in §16.7).

### 16.3 The "compact CTA card" pattern

Rather than inventing a bespoke fix per page, one small utility class was
added to `src/v2/v2.css`:

```css
.v2 .v2-cta-card { border-radius: var(--v2-radius-l); padding: var(--v2-s-8) var(--v2-s-6); }
```

Paired with the existing `.v2-night` class on the same element, this
reuses all of `.v2-night`'s already-defined text/link/button-color
cascade for free — the section around it just needs to be a normal light
`.v2-section`. Applied to: the homepage CTA, Government Contracting's
final CTA, and (via a CSS-only change, no JSX needed) every service
page's shared `.sp-cta-banner`, by making `.sp-cta-banner .container` the
card instead of the whole section. `/services/pediatrics` overrides the
card's background to a deep ocean teal (`#0B4650`) instead of the default
`var(--v2-night)`, to stay in its own palette (§16.5).

### 16.4 What was deliberately left dark, and why

Per the mission's own allowance ("dark navy may still be used sparingly
for small accents, text, or a compact CTA, but not as the dominant
background for large sections"):

- `.covmap-svg-wrap` (the inline SVG map on `/coverage`) — its dot/label/
  gradient colors are hand-tuned for a dark background; it's an
  illustration, not a text content section, and re-theming its internals
  risked breaking contrast for no real gain. Same reasoning as Part 1.
- `.covmap-contact` — a small phone-number chip, explicitly a "compact
  CTA."
- `.gc-doc-sheet` — the small cover-mockup header of the capability
  statement "document card" on `/government-contracting`; a compact,
  self-contained decorative card, not a section background.
- Every `.v2-cta-card` (§16.3) — explicitly allowed as a "compact CTA."

Everything else that was a large `var(--v2-night)` section background is
now light.

### 16.5 Pediatric ocean theme

**Replaces** the rocket/star/planet motif restored in Part 1, per the
owner's revised direction. Built entirely from original, hand-authored
CSS shapes plus icons already available in this codebase's existing
`react-icons/fa` dependency (`FaFish`, `FaLifeRing` — both part of the
Font Awesome 5 Free set already in use elsewhere in this repo; no new
package was added). **Nothing was copied from any reference image,
competitor site, or third-party artwork** — every shape (wave path,
bubbles, coral blobs) is original CSS/SVG authored for this page.

Decorative band (`.peds-ocean-art`, in `src/pages/PediatricsTransport.jsx`/`.css`):
- A pale turquoise gradient panel (`#EAF7F6` → `#CFEDEA`)
- One inline SVG wave divider along the bottom edge (a single hand-drawn
  cubic-bezier path, no external file)
- Four small CSS-circle "bubbles" with a slow (8s), fading rise —
  the only animation on the page, and it collapses to ~0ms under
  `prefers-reduced-motion` via the sitewide `.v2 *` rule (verified in
  §16.7)
- Three small CSS "coral" blobs (asymmetric `border-radius`, coral/peach
  color), fully static
- Two `FaFish` icons, fully static, no swimming animation

Palette used across the page: aqua/teal (`#0EA5B0`), a deeper sea blue
(`#2D7DA6`, `#3E8FB0`) for the second service card and one trust card, a
coral accent (`#FF8A65`) for the "Clear Parent Communication" card and
the "Free Evaluation" heart icon, and the deep ocean teal (`#0B4650`) for
the compact CTA card, with a light aqua `FaLifeRing` icon rather than the
old rocket. All colors were chosen for a calm, professional read — muted
rather than saturated/neon — consistent with the mission's "not a
daycare, not a cartoon, professional enough for hospitals and government
buyers" constraint.

Section labels were lightly renamed to track the brief's suggested flow
without restructuring or duplicating already-verified content: "Safety
and Communication" (was "Why Parents Trust Us") and "Family and Facility
Coordination" (was "Our Commitment") — same cards and copy underneath,
already reviewed for factual safety in Part 1 §11 (no neonatal, ALS,
response-time, or guaranteed-coverage claims; nothing in this pass
touched pediatric copy beyond those two section labels).

All decorative ocean elements are `aria-hidden="true"`; all service
information remains real HTML text.

### 16.6 Therapy page

Per the mission's "should coordinate visually with Pediatrics, but should
not duplicate the full ocean theme" instruction: `/services/therapy`
keeps its plain V2 card layout (no waves, bubbles, or coral) but its
accent color shifted from the site's default blue (`--v2-blue`) to a
related soft aqua (`#12A3AD`), so the two pediatric-adjacent pages read as
part of the same family without Therapy getting its own decorative motif.

### 16.7 Accessibility and mobile-bar verification

- Heading order: re-swept all 12 routes after every change in this pass —
  unaffected; still 11/12 clean, 404 still has its documented minor gap
  (Part 1 §8).
- Reduced motion: verified with Playwright's `reducedMotion: 'reduce'`
  emulation that `.peds-bubble-1`'s animation duration and the CTA-box
  heartbeat both collapse to ~0ms.
- `aria-hidden`: confirmed `true` on `.peds-ocean-art` and the CTA
  banner's `FaLifeRing` icon.
- Mobile fixed action bar: scrolled a long page (`/`) to the true bottom
  at a 390×844 viewport and measured the bar's and the footer legal
  text's bounding rects directly — no overlap (footer content ends ~80px
  above the bar's top edge). Screenshot confirms a clean visual
  separation between the light footer and the fixed bar.

### 16.8 Responsive results (Part 2)

Full sweep at 320/375/390/768/1440/1920px across all 12 live routes.
Found and fixed one real bug: `/coverage` overflowed horizontally at
320px because `.covmap-layout`'s mobile breakpoint used a bare `1fr`
grid track (doesn't shrink below its content's min-content width — the
same overflow-trap bug class fixed multiple times elsewhere in this
codebase's history). Changed to `minmax(0, 1fr)`. After the fix: **zero
horizontal overflow across all 72 route/width combinations.**

### 16.9 Performance

No new dependencies, no animation library, no video/Lottie. The ocean
decoration is CSS shapes + one inline SVG path + two already-imported FA
icon components. The pediatric bubble animation is the only new
animation on the site and is a plain CSS `@keyframes` rule.

### 16.10 Lint, build, and console errors

`npm run lint` — 0 problems. `npm run build` — succeeds (same pre-existing
>500 KB chunk-size notice, unrelated). No new console errors on any route
during the full sweep (the only console entries observed were from the
test harness's own deliberate block of `fonts.googleapis.com`, used to
route around the pre-existing font-loading network flake noted in Part 1
§14 — unrelated to any code in this pass).

### 16.11 Remaining unreachable legacy files

Unchanged from Part 1 §14 — the same set of orphaned `src/components/*`
V1 components remains, untouched, not imported by anything reachable from
`App.jsx`.

### 16.12 Future cleanup recommendations

- `/services/long-distance` still has no in-app link (Part 1 §5) — still
  unresolved, still requires an owner decision, not something this
  visual-migration pass was scoped to fix.
- The dead `.v2-night .gc-copy` rule in `GovernmentContracting.css` is
  now unreachable (its only two usages are both in sections that are
  light after this pass) — harmless, but a candidate for a future
  cleanup pass.
- The confirmed-dead CSS blocks documented in Part 1 (`EventStandby.css`,
  `RequestCoverage.css` orphaned hero rules) are untouched and still
  exactly as documented.
