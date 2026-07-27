# Complete Experience Audit

Mission: Complete Life Star EMS Website Experience, Visual, Trust, Privacy,
Accessibility, SEO, and Lead-Handling Transformation. Branch:
`claude/lifestar-complete-experience-redesign`. Starting commit:
`f01ef8aaed6b710ae4312afa9fee43995d97a742` (= `origin/master` at mission
start, confirmed identical).

This audit was built by direct inspection of every live route's source
(App.jsx, every page component, shared components, content files) plus a
targeted grep sweep for emoji, iframes, orphaned components, dead CSS,
manual heading breaks, and risky-claim keywords. All findings below are
based on reading the actual code, not assumption.

## 1. Complete route table (from `src/App.jsx`)

```jsx
<Route path="/" element={<HomeV2 />} />
<Route path="/services/dialysis" element={<DialysisTransport />} />
<Route path="/services/therapy" element={<TherapyTransport />} />
<Route path="/services/pediatrics" element={<PediatricsTransport />} />
<Route path="/services/events" element={<EventStandby />} />
<Route path="/services/long-distance" element={<LongDistanceTransport />} />
<Route path="/request" element={<RequestCoverage />} />
<Route path="/about" element={<About />} />
<Route path="/coverage" element={<CoveragePage />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/government-contracting" element={<GovernmentContracting />} />
<Route path="*" element={<NotFound />} />
```

`HeaderV2`/`FooterV2`/`Seo` wrap every route globally (rendered as siblings
of the `<Routes>` block, not per-route), so header, footer, and the
client-side metadata effect apply everywhere automatically.

## 2. Route classification

| Route | Classification | Notes |
|---|---|---|
| `/` | Converted legacy → visually incomplete | V2 shell, but two literal empty `.v2home-photo-slot` panels, a text-only "Crew and operations" section, and a Facebook-iframe-dependent Community section (see §4, §5) |
| `/services` | **Missing** | Not registered anywhere. Nav's services dropdown has no "all services" link. Referenced nowhere. |
| `/services/dialysis` | Fully V2 (visual) / fact-risk | Absolute claims: "Always On Time", "every single appointment", "Free Evaluation", "at no cost", "we'll handle everything", "familiar drivers you recognize" |
| `/services/therapy` | Fully V2 (visual) / fact-risk | Same claim pattern; emoji still used for therapy-type icons (see §5) |
| `/services/pediatrics` | Fully V2 (visual, ocean theme present) / fact-risk | "all types", "never miss", "Free Evaluation" |
| `/services/events` | Fully V2 (visual) / fact-risk / accessibility-risk | Emoji used for all 8 event-type icons; headline claims "Any Sport. Any Event. Any Size."; form fields lack some accessibility polish |
| `/services/long-distance` | Fully V2 (visual) / fact-risk (lighter, already partly hardened in a prior mission) | "Request a Free Quote" language; still worth a cautious-language pass; not in header/footer/nav discovery paths despite being registered (confirmed live route with zero in-app links) |
| `/coverage` | Converted legacy / visually incomplete | The "map" is a hand-drawn abstract SVG with approximate, non-geographic city placement, not an accurate representation |
| `/request` | Fully V2 (visual) / fact-risk / privacy-risk | Combines Dialysis/Therapy/Pediatric-and-long-distance/Events into one dropdown (no separate Long-Distance option); no privacy link, no data-minimization notice, no honeypot, client-side-only insert |
| `/about` | Fully V2 | Solid; room to add timeline/facts strip/gallery/links per Phase 18 |
| `/government-contracting` | Fully V2, most rigorous page on the site | Fake capability-statement mockup card (icon + text, not a real thumbnail); otherwise exemplary fact discipline (see §7) |
| `/contact` | Fully V2 (visual) / fact-risk (minor) | No photo; emoji in form success state; contracting vs dispatch number not surfaced here (only dispatch shown) |
| `/privacy` | **Missing** | Not registered. Footer's "Privacy policy" renders as `<li className="v2f-muted">{footer.privacyLabel}</li>` — a plain `<li>`, not a link, no `href` at all. |
| `/sitemap` (human-readable) | **Missing** | Only `/sitemap.xml` exists (a static file in `public/`), no human-facing page. |
| Unknown route (e.g. `/this-does-not-exist`) | Renders `NotFound.jsx` client-side, but returns **HTTP 200** | `vercel.json`'s catch-all rewrite (`{ "source": "/(.*)", "destination": "/index.html" }`) sends every path to `index.html` with a 200. There is no way today for a crawler or monitoring tool to see a real 404 status. |

## 3. Duplicate / orphaned components

Confirmed via import-graph tracing (grep for every `src/components/*`
filename across all of `src/`): **every file under `src/components/`
except `Contact.jsx` (used by `ContactPage.jsx`) and `CoverageMap.jsx`
(used by `CoveragePage.jsx`) is orphaned** — not imported by `App.jsx` or
anything reachable from it. This includes a full V1 (dark-navy) `Navbar`,
`Footer`, `Hero`, `About`, `Coverage`, `Gallery`, `Services`,
`LongDistance`, `LongDistanceCities`, `Insurance`, `EmergencyBar`, and
`FloatingNav`. None of these render on the live site. This has been
documented in prior missions (`docs/THEME-CONSISTENCY-AUDIT.md`) and is
carried forward here unchanged; Phase 25 will remove them once their
orphan status is re-verified.

## 4. Empty / placeholder elements (confirmed by direct read)

- `src/v2/HomeV2.jsx:123` — `<div className="v2-panel v2home-photo-slot" aria-hidden="true" />` in the "Why Life Star" section. Renders as a blank tinted box; no image.
- `src/v2/HomeV2.jsx:172` — `<div className="v2-panel v2-panel-tint v2home-photo-slot" aria-hidden="true" />` in the "Coverage" section. Same problem.
- `src/v2/HomeV2.jsx:152-161` — "Crew and operations" section is label + heading + one paragraph, no image, no cards. Text floating in whitespace.
- `src/v2/HomeV2.jsx:222` — `<section id="reviews" hidden aria-hidden="true" />`. A genuinely empty, permanently-hidden placeholder section with no content and no plan to fill it from real data yet.
- `src/pages/GovernmentContracting.jsx:453-458` — the "capability statement" preview is a styled `<div>` with the app icon and two lines of text standing in for a document thumbnail, not a real preview of the actual PDF.
- `src/pages/About.jsx` Leadership section — an empty gray placeholder box where the CEO headshot should be (bio text present, photo missing). Found via the baseline screenshot capture (§15), not caught during direct source reading; needs a Phase 18 fix using a real, approved photo (no invented/stock substitute).

## 5. Third-party iframe / embed risk

`src/v2/CommunityShowcase.jsx` is the homepage's "Life Star in the
Community" section. It renders one of two paths based on
`hasCuratedPosts` from `src/v2/content/facebookPosts.js`:
- **`CuratedShowcase`** — real local cards, no iframe. Currently unused because `facebookPosts.js` intentionally ships empty (no real, owner-approved Facebook posts have been curated yet, per its own header comment — inventing fake ones would be fabricating content).
- **`LiveTimeline`** (the current live path) — embeds `facebook.com/plugins/page.php` inside an `<iframe>`, auto-loaded via `IntersectionObserver` once the section nears the viewport (not gated behind a user click). Before it loads, the only visible content is the app icon and a "Loading posts from Facebook" line — not a meaningful fallback. There is no explicit `onError` handler on the iframe itself, so a genuine load *failure* (vs. a slow load) leaves that placeholder showing indefinitely, with only the always-visible "Open Facebook page" outbound link as the real fallback. **Confirmed by the baseline screenshot capture (§15):** the embed fails to load (broken-image icon) under this sandbox's restricted network, exactly the failure mode described above — the outbound link remained the only functional fallback, as designed, but the broken-embed visual is exactly the "no empty/broken-embed sections" problem Phase 9 must fix.

`src/v2/CommunityShowcase.jsx:63-71` also embeds a second iframe
(`facebook.com/plugins/video.php`) for any video post, gated behind an
explicit "Play video" button click — this one is already appropriately
progressive (does not auto-load), and is left as-is.

## 6. Icon system

The codebase already uses a single icon family consistently —
`react-icons/fa` (Font Awesome 5 Free) — everywhere icons are used as
React *components*. No other `react-icons/*` subpackage is imported
anywhere (confirmed across 15 files by the grep-sweep agent). Separately,
several `v2/` chrome files (Header, Footer, HomeV2, CommunityShowcase,
InnerPage) and `GovernmentContracting.jsx` use hand-authored inline SVGs
for chevrons/hamburger/close/Facebook glyphs — not a family conflict, but
a methodology inconsistency (react-icons vs. raw SVG) worth normalizing
under the Phase 4/5 `AccessibleIcon` component.

The real problem is **emoji used as primary icon artwork on live routes**,
confirmed by direct read and independently by the grep-sweep agent:
- `src/pages/TherapyTransport.jsx:9-11` (data) / `:45-46` (render) — the
  `therapies` array uses `icon: '🦵'/'✋'/'🗣️'` and `emoji: '🏃'/'🎨'/'💬'`
  for the three therapy-type cards, rendered with **no `aria-hidden`**, so
  screen readers announce raw emoji names. **Correction to a prior
  finding:** `docs/THEME-CONSISTENCY-AUDIT.md` §9 states the Therapy
  page's emoji/space theme was fully removed and replaced with "a plain
  V2 card layout." That is true of the page's *background/hero* theme,
  but this specific pair of emoji icons is still live today — the prior
  doc's claim is not fully accurate for this element and should be
  corrected once Phase 5 replaces it.
- `src/pages/EventStandby.jsx:12-19` (data) / `:76` (render) — `icon:
  '🏈'/'⚽'/'🏃'/'🎵'/'🏀'/'🎓'/'🏆'/'🌟'` for all eight event-type cards, no
  react-icons alternative, no `aria-hidden`.
- `src/pages/EventStandby.jsx:98` — form success state `<span>✅</span>`.
- `src/pages/EventStandby.jsx:101` — decorative emoji prefix on the form
  heading itself: `<h3 className="form-title">🏆 Request Event
  Coverage</h3>`.
- `src/pages/LongDistanceTransport.jsx` and `src/components/Contact.jsx`
  (live, via `ContactPage`) — form success states also use
  `<span>✅</span>`.
- `src/pages/GovernmentContracting.jsx` — confirmed clean, no emoji
  present anywhere in this file.

Four confirmed instances of legacy emoji-as-icon in orphaned/dead
components (`LongDistanceCities.jsx`, `LongDistance.jsx`, `Coverage.jsx`,
`Gallery.jsx`, `Navbar.jsx`, `Insurance.jsx`) — not live, no action
required unless that code is ever resurrected.

## 7. Fact-risk keyword sweep (direct grep, every hit read in context)

Government Contracting and Long-Distance are already disciplined (recent
prior missions hardened both against the capability statement — see
`docs/SEO-FACT-VERIFICATION.md` item 9.3 and `docs/source/Life_Star_EMS_Capability_Statement.pdf`).
The following are new findings needing correction in this mission:

| File | Phrase | Read |
|---|---|---|
| `DialysisTransport.jsx` | "Always On Time" | Absolute punctuality claim |
| `DialysisTransport.jsx` | "arrive early — every single appointment" | Absolute, unverifiable |
| `DialysisTransport.jsx` | "Free Evaluation" / "at no cost to you" / "We'll handle everything" | Unverified financial/service promises |
| `DialysisTransport.jsx` | "Consistent, familiar drivers you recognize" | Operational guarantee not documented anywhere |
| `TherapyTransport.jsx` | "On Time, Every Time" | Absolute punctuality claim |
| `TherapyTransport.jsx` | "never misses a session" | Absolute |
| `TherapyTransport.jsx` | "Parent or guardian always welcome to ride along" | "always" — should be qualified |
| `TherapyTransport.jsx` | "Insurance verified before first ride" | Unverified process claim |
| `PediatricsTransport.jsx` | "all types of therapy appointments" | "all types" |
| `PediatricsTransport.jsx` | "never miss a therapy session" | Absolute |
| `PediatricsTransport.jsx` | "Free Evaluation" | Same as Dialysis |
| `EventStandby.jsx` | Headline "Any Sport.\nAny Event. Any Size." | "Any Size" directly contradicts the capability statement's own qualifier ("crowds of up to approximately 5,000") |
| `EventStandby.jsx` | "Fast on-site medical response" | Unqualified speed claim |
| `PediatricsTransport.jsx:135` | "On-time pickup — every appointment" | Absolute punctuality claim, same class as Dialysis's "Always On Time" |
| `TherapyTransport.jsx:104` | "We'll verify insurance and coordinate with your child's therapy team — at no cost to you." | "at no cost" financial claim, verify accuracy |
| `RequestCoverage.jsx`, `EventStandby.jsx` | (already fixed in a prior mission — no "within N hours" language found; confirmed clean) | — |

No `ALS`-as-a-licensing-claim, no `SBA`/`8(a)`/`HUBZone`/`SDVOSB`/`VOSB`/`WOSB`/`EDWOSB`
certification claims, and no `HIPAA` compliance claims, and no literal
"guarantee"/"guaranteed" were found anywhere in `src/` (confirmed by two
independent grep sweeps — my own and the background agent's). These
safeguards are currently intact; this mission's job is to keep them
intact while extending the same discipline to the pages above.

**Orphaned code contains claims the live-code policy forbids.** Four
confirmed ALS-licensing-style claims exist in dead/unreachable components:
`src/components/About.jsx:49-50` ("BLS / ALS — Certified Professional
Crews"), `src/components/Hero.jsx:7` (`{ val: 'BLS/ALS', label: 'Certified
Crews' }`), `src/components/LongDistanceCities.jsx:26,29` ("certified
BLS/ALS crews"), `src/components/LongDistance.jsx:23` ("BLS/ALS certified
crews for every mile"). None of these render today (see §3), but
`src/v2/content/government.js:15`'s own comment ("No ALS-provider
licensure claim anywhere") documents a policy this dead code already
violates — a reason to remove rather than resurrect these components in
Phase 25, not to reuse any of their copy.

## 8. Broken / near-empty image files and unreferenced assets

Confirmed by the background grep-sweep agent:

- **Three 21-byte stub files** — `public/images/logos/uhc.png`,
  `molina.png`, `bcbs.png` — far below any real PNG's minimum viable size,
  i.e. broken/placeholder files never replaced with real logo art. Real
  `.svg` versions of the same three logos exist alongside them, but see
  next point: the whole directory is unreferenced, so this is currently
  moot for rendering.
- **`public/images/logos/` (23 files) is entirely unreferenced** —
  `grep -rn "images/logos" src` returns zero matches. The only insurance
  logos referenced anywhere in `src` are top-level `/images/*.svg` paths
  inside the orphaned `src/components/Insurance.jsx:4-17` — i.e. even the
  *referenced* insurance logos are referenced only from dead code.
- **8 unreferenced top-level logo files** — `logo-blue.png`,
  `logo-final.png`, `logo-icon-white.png`, `logo-inverted.png`,
  `logo-new.png`, `logo-transparent.png`, `logo-white.png`, `logo.png`.
  Only `logo-icon.png` is referenced, and only from orphaned V1
  components (`Footer.jsx`, `Hero.jsx`, `Navbar.jsx`); the live `v2/`
  chrome uses `/icon-192.png` instead.
- **`public/images/company/heather-ayala-segovia-seated-full.jpg`** (+
  its `optimized/` derivatives) — zero references in `src`, corroborated
  by `docs/THEME-CONSISTENCY-AUDIT.md` §14/§16.11 as a known follow-up
  from a prior photography mission.
- **`public/images/photo-3.jpg`** — referenced only from the orphaned
  `src/components/Gallery.jsx:20`, so effectively unreferenced from any
  live route.

None of this affects current rendering (nothing broken is actually
displayed on a live route today), but it is real disk weight and repo
clutter. Phase 25 will remove the confirmed-orphaned assets after this
documentation step, consistent with the mission's "document before
delete" rule.

## 9. Legacy V1 CSS / dark-theme remnants

Prior missions (documented in `docs/THEME-CONSISTENCY-AUDIT.md`) already
converted every live page off the dark-navy V1 theme and removed the
site-wide dark footer and full-bleed dark CTA bands, replacing them with
compact contained "night" accent cards. Direct re-inspection in this
audit confirms that state is still intact on `origin/master`. The
remaining dark surface is deliberately scoped: `.sp-cta-banner .container`
(compact CTA card), the `CoverageMap` SVG panel (its colors are tuned for
a dark background), and the `.gc-doc-sheet` mock card being replaced in
this mission. No unscoped dark band was found.

**Confirmed unused CSS selectors** (background grep-sweep agent, spot-check
of the largest CSS files, cross-referenced against every consumer `.jsx`):
- `src/pages/ServicePage.css` (shared by all 5 service pages) — 10 unused
  selectors, all real rule definitions with zero matches: `.sp-hero`,
  `.sp-hero-bg`, `.sp-inner`, `.sp-badge`, `.sp-h1`, `.sp-accent`,
  `.sp-lead`, `.sp-btns`, `.sp-dot`, `.sp-addr`. Same "hero" family
  already documented as dead in `EventStandby.css`/`RequestCoverage.css`'s
  own inline comments (superseded by `InnerPage`'s intro) — just
  undocumented in this particular file.
- `src/components/CoverageMap.css` — 1 unused selector: `.cc-sub`.
- `src/pages/PediatricsTransport.css` and `LongDistanceTransport.css` —
  confirmed 0 unused selectors; fully clean.
- `src/pages/GovernmentContracting.css:90-91` — `.v2-night .gc-copy` and
  `.v2-night .gc-copy:hover` are now unreachable (per
  `docs/THEME-CONSISTENCY-AUDIT.md` §16.12: the element using `.gc-copy`
  no longer sits inside a `.v2-night` section after a prior pass), though
  not marked with an inline dead-code comment.

These will be removed alongside the already-documented dead blocks in
Phase 25, after re-verifying against the post-Phase-4-9 component tree
(selectors could become newly-used if shared components are
reintroduced).

## 10. Manual heading line breaks

Every service page's `<h2 className="title">` uses a hardcoded `<br />`
to force a two-line heading (e.g. `DialysisTransport.jsx`: `Built Around<br /><em>Your Schedule</em>`;
this pattern repeats on every `.sp-features`/`.sp-two` section across
Dialysis, Therapy, Pediatrics, Events, and Long-Distance — roughly a
dozen instances). This forces the same line break at every viewport width
regardless of available space, which can look fine at the widths it was
tuned for and orphan/crowd words at others. Left for a CSS-driven wrap
approach (`max-width` on the heading, no forced `<br>`) as part of the
`SectionHeader` shared component in Phase 4.

## 11. Metadata mechanism (client-side only)

`src/components/Seo.jsx` applies `document.title` and all `<meta>`/`<link>`
tags inside a `useEffect`, keyed on route. The static `index.html` only
carries the homepage's tags. **Any crawler or unfurler that does not
execute JavaScript sees the homepage's title/description/OG tags for
every route** — confirmed by reading `index.html` and `Seo.jsx` together;
there is no build-time or server-side per-route head output today. This
is the concrete problem Phase 26 (and the Phase 22 real-404 work, which
share a solution — see the architecture note below) needs to fix.

**Planned fix (documented here, implemented in Phase 22/26):** a
post-build Node script (`scripts/prerender.mjs`) that, for every known
public route, writes a literal `dist/<route>/index.html` — a copy of the
built shell with that route's `<head>` tags substituted in — so a
non-JS request for any known path gets correct static metadata without a
framework migration. Once every known route has its own file, narrowing
`vercel.json`'s catch-all rewrite (and shipping a real `dist/404.html`)
lets Vercel's normal static-file 404 behavior take over for genuinely
unknown paths, while client-side `pushState` navigation between routes is
untouched (same JS bundle, same React Router).

## 12. Forms inventory (all five, direct read)

| Form | File | DB table | Honeypot | Rate limit | Server validation | Notification |
|---|---|---|---|---|---|---|
| Contact | `components/Contact.jsx` | `contact_submissions` | None | None | None (client insert only) | None |
| Request Transport | `pages/RequestCoverage.jsx` | `contact_submissions` | None | None | None | None |
| Event EMS request | `pages/EventStandby.jsx` | `contact_submissions` | None | None | None | None |
| Long Distance request | `pages/LongDistanceTransport.jsx` | `long_distance_requests` | None | None | None | None |
| Government inquiry | `pages/GovernmentContracting.jsx` | `contact_submissions` | Yes, client-side only (`website` field, `if (form.website) return`) | None | None | None |

All five write directly from the browser via `@supabase/supabase-js`
using the public anon key (`src/lib/supabase.js`). RLS on both tables
(`supabase/migrations/001_contact_submissions.sql`,
`002_long_distance_requests.sql`) permits `anon` `INSERT` only — no
`SELECT`/`UPDATE`/`DELETE` for anonymous users (confirmed by reading both
migration files; no policy grants those verbs to `anon`), which is
correct as far as it goes. But there is no schema validation, length
limit, HTML stripping, real (server-verified) spam control, submission
type/source column, status/audit trail, or outbound notification — a bot
that skips the React form entirely and POSTs straight to Supabase's REST
endpoint (the anon key is public in the client bundle by necessity) is
not stopped by anything today. This is the exact gap Phase 23 addresses.

All four `contact_submissions`-backed forms funnel different inquiry
types (general contact, transport request, event request, government
inquiry) into one generic `message` text column with no structured type
field — losing the ability to filter/report by inquiry type without
parsing free text.

## 13. Accessibility spot-findings (from direct read, full pass in Phase 24)

- `HeaderV2`'s mobile-menu-close-on-route-change is implemented as a
  render-time state adjustment (`if (location !== prevLocation) { ... }`)
  rather than a `useEffect` — functionally correct today, but the
  mission asks for the effect-based form; will change for clarity and
  consistency with the rest of the effect-driven interaction code in the
  same file.
- No `aria-current="page"` on any header nav link — active route is not
  announced to assistive tech or shown as a distinct visual state.
- `ServicesDropdown` has no "All Services" entry, and neither does the
  mobile sheet's services group — ties into the Phase 6 IA gap (§2).
- Manual `<br>` headings (§10) are a minor responsive/i18n smell, not a
  hard accessibility failure, but worth fixing alongside the heading
  component work.
- Government Contracting's `CopyButton` already announces "copied" via a
  `role="status"` live region — good existing pattern to reuse for any
  new copy-to-clipboard UI.

## 14. What's already right (do not regress)

- Sticky header, Escape-to-hamburger focus return, and mobile-menu focus
  trap are already implemented correctly (`Header.jsx`) and must survive
  the route-change-effect refactor unchanged.
- RLS is enabled and correctly scoped (anon insert-only) on both existing
  form tables.
- No ALS-licensing claim, no SBA/8(a)/HUBZone/SDVOSB/VOSB/WOSB/EDWOSB
  claim, no HIPAA claim anywhere in the codebase today.
- DSHS wording ("Current, Ground Only, BLS") and the dispatch/contracting
  number distinction are already correct and consistent on Government
  Contracting; this mission extends that same discipline to Contact and
  every service page rather than re-deriving it.
- The single-dark-"night"-chapter visual pattern, the compact CTA card
  pattern, and the light V2 token system are already correct sitewide
  (confirmed by re-reading `v2.css`, `tokens.css`, and every page's CSS)
  and are the foundation this mission builds on, not replaces.

## 15. Baseline "before" screenshot capture

Captured by a background agent against a production build (`npm run
build` + `npm run preview`), before any mission code changes. **47 PNGs**
in `/tmp/claude-0/-home-user-lifestar-ems/6c4dabbe-d83d-5ba5-a99a-0caa852f3026/scratchpad/before_baseline/`
(scratchpad only, not committed — Phase 28 will produce the final
before/after contact sheets from this baseline plus an after pass): 30
full-page route screenshots (15 routes × 390×844 and 1440×1000) + 17
focused element/region screenshots, indexed in that directory's
`INDEX.md` with route/element, viewport, file path, page height, HTTP
status, and a factual visual note per shot.

**Routing/status confirmed by direct navigation (not just source
reading):** `/services`, `/privacy`, `/sitemap`, and a genuinely-unknown
path all return **HTTP 200** and render the byte-for-byte identical
client-side 404 page (heights matched exactly at each viewport: 2375px
mobile / 1313px desktop) — empirically confirms §2's and §11's
source-reading-based conclusion that the SPA catch-all serves 200 for
everything today.

**Visual gaps confirmed by screenshot, matching the source-reading
findings above:**
1. Both empty `.v2home-photo-slot` placeholder boxes render as visible
   blank tinted panels on the homepage (§4).
2. The homepage Facebook/Community embed shows a broken-image icon under
   this sandbox's restricted network (§5) — the styled fallback link
   remains visible and functional.
3. Dark-navy panels break the otherwise light V2 system in three visible
   spots: the `/coverage` SVG map + its "Call to Schedule" card, and the
   `/government-contracting` capability-statement mockup card (§9) —
   visually inconsistent, not broken.
4. Everything else — all five service pages, header dropdown, mobile
   menu/action bar, footer, real photography — rendered cleanly with no
   layout breakage at either viewport.

**One new finding not previously documented:** `/about`'s Leadership
section has an empty gray placeholder box where the CEO headshot should
be (bio text is present, photo is not). This is a same-class problem as
the homepage photo slots (§4) and needs a Phase 18 fix (real photo or,
if none is available/approved yet, an honest interim treatment — not an
invented photo).

---

*Audit complete: this document now incorporates direct source reading,
the background grep-sweep agent's findings, and the baseline screenshot
capture. Phase 4 implementation begins next.*
