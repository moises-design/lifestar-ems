# Theme-Consistency Audit & Pediatric Visual Identity Restoration

Ran on branch `claude/lifestar-real-photography-leadership` while PR #2
("Real Photography, About Page, and Woman-Owned Leadership") was paused,
pre-merge, at the owner's request. **PR #2 was not merged, master was not
touched, and the source branch was not deleted.**

## 1. Route inventory — before / after

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
