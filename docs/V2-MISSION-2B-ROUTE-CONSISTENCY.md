# V2 Mission 2B — Route Shell Consistency and Navigation Repair

Date: 2026-07-24
Branch: `claude/lifestar-seo-foundation`

## 1. The previous split

After Mission 2, only `/` used the V2 Calm Response shell; the other eight
routes still rendered the V1 dark chrome (old Navbar, old Footer, space
themes), so following any homepage link felt like leaving the site. This
mission removes that split.

## 2. New shell architecture

- `src/App.jsx` now renders the V2 Header, emergency notice, Footer, skip
  link, and `main#main` on **every** route. The V1 `Navbar`, `FloatingNav`,
  and `Footer` components are no longer rendered anywhere (files retained
  for reference; removal comes with the Mission 7 cleanup).
- New `src/v2/InnerPage.jsx` wrapper gives every inner route an editorial
  V2 introduction: optional breadcrumb, section label, the route's single
  h1, lead paragraph, optional CTA row and media slot, consistent container
  and rhythm. Its `legacy` mode then hosts the existing page body inside a
  contained dark band (`.v2page-legacy`, deliberately outside the `.v2`
  scope so V1 CSS renders unchanged and readable). Visually this reads as
  a deliberate "night chapter" under a paper intro, consistent with the
  design system, until each body is redesigned in Mission 7.
- Per-page intro copy is centralized in `src/v2/content/en.js` (`pages.*`),
  preserving Spanish readiness.

## 3. Routes converted

All nine: `/` (already V2), the four service routes, `/request`,
`/coverage`, `/contact` (both now have a real h1 for the first time), and
the 404 page (reskinned to V2 paper with token-based styling, still
noindex). Verified per route: exactly one V2 header, zero V1 navbars, one
footer, one banner landmark, one h1, emergency notice present.

## 4. Navigation repairs

- "Why Life Star" now uses a router `Link` to `/#why-life-star` and works
  from every route (hash navigation verified from an inner page: lands on
  the homepage scrolled to the section; browser back returns to the inner
  page, forward returns to the hash — both verified headlessly).
- Services dropdown, Coverage, Contact, Request, and footer links verified
  to route correctly from inner pages.
- Every phone action sitewide now uses `tel:+19566606543` (verified: all
  tel links on rendered pages match exactly).
- The persistent mobile call/request bar now hides on `/request`, where it
  duplicated the form CTA.
- The V1 hero sections that duplicated h1s and carried the space theme
  (star fields, planets, rockets, emoji rows, scoreboard badges) were
  removed with their pages' conversion; the InnerPage intro replaces them.

## 5. Request page corrections (`/request`)

- V2 intro with conservative lead: "Submit your transportation or event
  standby request. Our team will review the details and contact you to
  confirm availability."
- Removed the broken string "Available Scheduled for emergencies and
  scheduling" and both "within 2 hours" promises (lead + success state).
- Success state now says the team will review and contact to confirm; the
  form note states it is for scheduled non-emergency requests only, that
  submitting does not confirm scheduling, and "For a medical emergency,
  call 911." The dispatch sidebar repeats the 911 notice verbatim.
- Added a clear "Planning an event?" sidebar box linking to the event
  standby form (`/services/events#event-form`), separating the two request
  types; the events page CTA also anchors to its own form.
- Form preserved exactly (same fields, Supabase insert, validation, error/
  success states); all eight labels now programmatically associated
  (htmlFor/id, verified), autocomplete attributes added, error message has
  `role="alert"`, success has `role="status"`. Empty-submit validation
  verified (focus lands on the first required field).
- Fixed a real mobile bug found in testing: the request grid overflowed
  390px viewports by 18px (grid min-content); fixed with `minmax(0, …)`
  tracks. Overflow now 0.

## 6. Contact page (`/contact`)

V2 intro + h1. Per the verified-facts rule, the unverified email
(gmail), street address, and "Mon–Sat" office hours rows were removed;
the page now shows the verified dispatch number, a "Service Region" line,
the Facebook link, and the working message form (labels associated,
alert/status roles, conservative success copy). The 911 notice appears in
the shell on every page.

## 7. Coverage page (`/coverage`)

V2 intro + h1 with the availability caveat "Contact us to confirm
availability for your location and schedule," distinguishing RGV coverage
from long-distance Texas trips. The existing map content remains in the
legacy band; the unverified email line was removed from the map sidebar.
Metadata and canonical unchanged.

## 8. Service routes

Dialysis, therapy, pediatrics, events: InnerPage intro (breadcrumb, label,
h1, lead, request/call CTAs) + existing substantive sections preserved in
the legacy band. Removed only: the old heroes (duplicate h1s + space
theme), unverified street-address blocks, the second "Available Scheduled"
broken string, the conflicting "Available 7 days a week" claim (hours
unverified), the unverified "within 24 hours" quote promise on the events
form, and the **Community Partners section** (PSJA ISD, Edinburg CISD,
UTRGV, Special Olympics, etc.) per owner decision 8 — partner claims stay
hidden until verified. Everything else (features, lists, forms, CTA
banners) is untouched pending Mission 7.

## 9. Footer fact decision

`docs/SEO-FACT-VERIFICATION.md` §4 lists the street address as
unverified (exact USPS format and public-facing status unconfirmed), so
the address was removed from the V2 footer and replaced with "Serving the
Rio Grande Valley from Edinburg, Texas" plus the verified phone. No email
or hours were invented. The address returns the moment the owner confirms
it.

## 10. Facebook embed adjustment

The live timeline is now centered with a max-width frame (stage 540px in a
600px editorial panel), a clean loading state (brand mark + "Loading posts
from Facebook" once requested, iframe fades in on load), preserved
near-viewport lazy loading, and an always-visible "Open our Facebook page"
button beneath the frame as the failure fallback (verified working with
facebook.com fully blocked). No Facebook SDK. The curated real-post
gallery (Mission 2A architecture, `src/v2/content/facebookPosts.js`)
remains the preferred final solution once the owner approves real posts.

## 11. SEO regression results

Headless sweep, production build, all nine routes: unique titles,
descriptions, canonicals unchanged; 404 noindex + no canonical; JSON-LD
present; robots.txt and sitemap.xml serve 200; favicons/manifest
untouched; no preview URLs anywhere in metadata.

## 12. Accessibility results

One h1 per route (previously zero on coverage/contact — now fixed); skip
link first tab stop; single banner/footer landmarks (no duplicates);
keyboard nav + dropdown Escape/focus-return re-verified; request and
contact form labels associated; error/status roles added; 48px targets
maintained; reduced-motion pass; mobile menu unchanged and verified.

## 13. Files changed

New: `src/v2/InnerPage.jsx/.css`, this doc. Modified: `src/App.jsx`,
`src/v2/Header.jsx` (Link hash nav, mobile-bar rule), `src/v2/Footer.jsx`
(address decision), `src/v2/content/en.js` (pages config, footer region,
FB labels, tel), `src/v2/CommunityShowcase.jsx/.css`, all seven page files,
`src/components/Contact.jsx`, `src/components/CoverageMap.jsx`,
`src/pages/NotFound.jsx/.css`, `src/pages/RequestCoverage.css` (grid fix),
plus sitewide `tel:+19566606543` normalization.

## 14. Tests

`npm run lint` 0 problems; `npm run build` passes. Screenshots reviewed at
1440 and 390 for home, request, contact, coverage, dialysis, 404; zero
horizontal overflow at both widths on all six after the request-grid fix.
Functional checks (all verified headlessly): header/footer/homepage links,
dropdown navigation, hash navigation from inner pages, back/forward,
request form load + validation + label association, phone link format,
direct route loads, robots/sitemap 200, Facebook fallback with facebook.com
unreachable, metadata sweep.

## 15. Remaining work for the full service-page redesign (Mission 7)

Legacy bands still use Barlow typography, emoji icon cards, condensed
display headings, and V1 buttons; EventStandby form labels not yet
associated; V1 component files (Navbar, Footer, Hero, About, etc.) await
archival; Barlow Google Fonts import still loads; homepage hero/photo
slots await Missions 3-5 imagery; curated Facebook gallery awaits owner
post approval.

## 16. Preview

Recorded in the final mission report after push. `master` and production
untouched.
