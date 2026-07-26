# V2 Mission 2A — Homepage Facebook Media Showcase

Date: 2026-07-24
Branch: `claude/lifestar-seo-foundation`
Owner correction implemented: the Facebook media is now visible directly on
the homepage; the click-to-load gate is removed.

---

## 1. Integration method chosen and why

Two modes, one component (`src/v2/CommunityShowcase.jsx`), selected
automatically by the data source:

1. **Curated media showcase (preferred, ready today, awaiting real posts).**
   An editorial featured card plus a rail of up to six supporting cards,
   fully in the Calm Response system: post image (stable dimensions, lazy
   below the fold), media-type indicator, date, caption excerpt, "View on
   Facebook" link; curated videos show a poster with an accessible 64px play
   control that loads Facebook's official per-video embed on demand (no
   autoplay, no sound until the visitor acts).
   It is data-driven from `src/v2/content/facebookPosts.js` and renders the
   moment real posts are added there. It ships **empty** because no Meta API
   credentials exist and inventing posts, captions, or dates is prohibited.
2. **Live timeline fallback (what visitors see today).** While the curated
   list is empty, the section shows the official Facebook Page timeline
   embed (photos and videos from facebook.com/LifeStarEMSRGV) directly on
   the page with **no click gate**, wrapped in an editorial paper frame with
   a "Live from our Facebook page" caption. The iframe is created only when
   the section approaches the viewport (IntersectionObserver, 600px
   margin), so the initial homepage render loads nothing from Facebook.

Why not the Graph API now: it requires a Meta app + page access token,
which must never ship in client-side `VITE_` variables; see §9 for the
server-side setup that would enable a fully native feed later. No scraping,
no fabricated credentials, no fabricated content.

## 2. Data source

`src/v2/content/facebookPosts.js` — single source of truth with full field
reference (`postUrl`, `mediaType`, `image`, `width/height`, `videoUrl`,
`caption`, `date`, `alt`, `featured`) and step-by-step instructions in the
file header. No post data is hardcoded in components. Section copy lives in
`src/v2/content/en.js` (`home.facebook`), keeping Spanish readiness intact.

## 3. Homepage placement

Section `08 · Community — "Life Star in the Community"` sits after the
event standby and audience-path sections and before the FAQ and final
scheduling CTA, as directed. Supporting copy: "See recent transports, event
standby coverage, crew activity, and community involvement from Life Star
EMS." A small Facebook glyph + "Follow Life Star EMS" link (48px target)
sits in the section head; the footer Facebook link is preserved.

## 4. Media-loading behavior

- Initial render: zero Facebook requests (verified: 0 requests at page top).
- Scrolling within ~600px of the section creates the timeline iframe
  (verified: first facebook.com request fires only then), `loading="lazy"`
  as a second layer. Until then a quiet brand placeholder holds the exact
  frame size (no layout shift).
- Curated images: explicit `width`/`height` + locked aspect-ratio boxes
  (no CLS), `loading="lazy"` for rail cards, eager only for the featured
  card. Curated videos download nothing until play is pressed.

## 5. Privacy behavior

Nothing from Meta loads during initial render. When the visitor scrolls
near the community section, the Facebook Page Plugin iframe loads from
`facebook.com/plugins/page.php` (Meta may set cookies at that point; this
is the documented third-party resource). No Facebook SDK script is ever
loaded, sitewide. In curated mode the page loads no Meta resources at all
until a visitor presses play on a video (then `facebook.com/plugins/
video.php` loads for that video only).

## 6. Accessibility behavior

Semantic `section` + `aria-labelledby` heading; iframe has a descriptive
`title`; play control is a real `button` with per-post `aria-label`, 64px
hit area, keyboard-verified (Enter swaps poster to embed); visible focus
ring on all controls (verified on the follow link: 48px height, outline
solid); dates use `<time datetime>`; captions are clamped visually but
remain full text for assistive tech; no autoplay, no sound without
interaction; reduced-motion verified (section renders, token durations
collapse).

## 7. Performance impact

Zero third-party bytes on initial render; the plugin (~0.5 MB from Meta)
loads only near-viewport. Homepage JS unchanged apart from ~3 kB of
component code. Resilience verified with facebook.com fully blocked
(sandbox network policy): the homepage renders, heading/follow link/FAQ/h1
all intact — a Facebook outage cannot crash the page; the follow link
remains the useful path.

## 8. How posts are updated

Edit `src/v2/content/facebookPosts.js`: paste the real post URL, drop the
approved image into `public/images/community/`, fill caption/date/alt, mark
one entry `featured: true`. The section switches from the live timeline to
the curated showcase automatically on the next deploy. Curated mode was
render-tested locally with temporary entries (screenshots reviewed at 1440
and 390, play control keyboard-tested) and the temporary entries were
removed before commit (`git grep "LOCAL RENDER TEST"` returns nothing).

Note for curation: the existing repo photos `ambulance-1.jpg`,
`photo-2.jpg`, `photo-3.jpg` show genuine Life Star branded vehicles
(already published on the V1 site) and can seed the first curated posts
once the owner pairs them with their real post URLs and dates.

## 9. Credentials / owner setup still required

- **Now (no credentials needed):** approve 4-7 real posts (URLs + captions
  + dates) so curated mode can activate, or confirm the live timeline is
  acceptable long-term.
- **Later (optional, for a fully native auto-updating feed):** create a
  Meta developer app, generate a long-lived Page access token, and store it
  server-side only (e.g. Vercel serverless function or scheduled job
  writing a cached JSON the client fetches; token in a non-`VITE_` env
  var). Not implemented; no tokens exist in the repo or client bundle.

## 10. Files changed

- New: `src/v2/CommunityShowcase.jsx/.css`, `src/v2/content/facebookPosts.js`,
  this document.
- Modified: `src/v2/HomeV2.jsx` (section swap), `src/v2/content/en.js`
  (community copy).
- Deleted: `src/v2/FacebookFeed.jsx/.css` (click-to-load treatment).
- Untouched: footer Facebook link, all SEO files, navigation, service
  pages, routes.

## 11. Tests

`npm run lint` 0 problems; `npm run build` passes. Headless (production
build): 0 FB requests at top → 1 after approach (lazy verified); homepage
fully functional with facebook.com unreachable; overflow 0 at 390/430/1440;
follow-link focus ring + 48px target; play control keyboard-operable
(curated test build); reduced-motion pass; metadata regression pass
(`/`, `/services/dialysis`, `/request`, unknown route → correct titles,
canonicals, 404 noindex). Screenshots reviewed at 1440 and 390 for both
modes. The live iframe itself cannot render inside the sandbox (network
policy blocks facebook.com) — verify visually on the Vercel preview.

## 12. Preview

Recorded in the final mission report after push (Vercel Preview only;
`master` and production untouched).
