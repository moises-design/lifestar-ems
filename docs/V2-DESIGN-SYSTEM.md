# Life Star EMS V2 — Design System Proposal

Date: 2026-07-24
Status: proposal for the "Calm Response" direction. Tokens become CSS custom
properties in Mission 2 of `docs/V2-IMPLEMENTATION-PLAN.md`.

---

## 1. Font direction

| Role | Primary (free) | Fallback stack | Why |
|---|---|---|---|
| Display / headlines | **Source Serif 4** (Google Fonts, variable) | `Georgia, 'Times New Roman', serif` | Bookish editorial authority without quirk; reads clinical-warm at 40-72px; variable weight keeps one file |
| Body / UI | **Inter** (Google Fonts, variable) | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` | Neutral, highly legible at 15-18px, excellent numerals for schedules/phone numbers |
| Micro-labels / eyebrows | Inter, uppercase, tracked | same | Replaces any monospace flavor without adding a third family |

Secondary option if Source Serif 4 fights the wordmark in testing:
**Newsreader** (also free/Google). Do not license paid fonts for V2. Load via
self-hosted woff2 subsets (`font-display: swap`), max 2 families, max ~120 kB
total font payload.

The current Barlow/Barlow Condensed pairing is retired with the space theme.

## 2. Type scale (rem-based, fluid via clamp)

| Token | Desktop | Mobile | Use |
|---|---|---|---|
| `--fs-display` | 4.5rem / 72 | 2.5rem / 40 | Homepage hero only |
| `--fs-h1` | 3.5rem / 56 | 2.25rem / 36 | Page heroes |
| `--fs-h2` | 2.5rem / 40 | 1.75rem / 28 | Chapter headings |
| `--fs-h3` | 1.75rem / 28 | 1.375rem / 22 | Sub-sections, card titles |
| `--fs-h4` | 1.25rem / 20 | 1.125rem / 18 | Minor headings |
| `--fs-body` | 1.125rem / 18 | 1.0625rem / 17 | Paragraphs |
| `--fs-small` | 0.9375rem / 15 | 0.9375rem / 15 | Captions, meta |
| `--fs-label` | 0.8125rem / 13 | 0.75rem / 12 | Micro-caps eyebrows, +0.12em tracking, uppercase |

Serif headings: weight 550-620, line-height 1.05-1.15, no letterspacing.
Body: weight 400/500, line-height 1.6, measure capped at 65ch.

## 3. Color palette

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F8F6F2` | Base background (warm off-white) |
| `--paper-2` | `#EFEBE4` | Alternate band, cards on paper |
| `--ink` | `#0E1B26` | Primary text; evolved from V1 navy family |
| `--ink-2` | `#3D4E5C` | Secondary text on paper |
| `--night` | `#0A1622` | The single dark chapter + footer background |
| `--night-text` | `#E9EEF3` | Text on night |
| `--night-muted` | `#93A6B5` | Secondary text on night (AA on `--night`) |
| `--blue` | `#0B9ED9` | Brand accent: primary buttons, key highlights, large graphic accents only |
| `--blue-ink` | `#066A9C` | Text-level links and small blue text on paper (AA compliant) |
| `--sky-tint` | `#E3F2FA` | Quiet tinted panels, hover fills |
| `--hairline` | `rgba(14,27,38,0.14)` | Borders, dividers on paper |
| `--hairline-night` | `rgba(233,238,243,0.16)` | Borders on night |
| `--focus` | `#0B9ED9` | 2px focus ring + 2px offset |

### Brand blue usage rules

- `#0B9ED9` measures ~2.7:1 on white: **never body-size text on light
  backgrounds**. Allowed: primary button fill (with white text at 4.6:1 it
  fails AA for normal text, so button labels on blue use `--ink` text or the
  button uses `--blue-ink` fill; final call in Mission 2 contrast pass),
  large display accents (3:1 large-text rule), icons at 24px+ with adjacent
  labels, the focus ring.
- Text links on paper always use `--blue-ink` (≥4.5:1).
- One blue moment per viewport as a guideline; blue never used as a section
  background wash.

### Neutrals

Grays are warm (blue-gray ink family), never pure #000/#666. Photography
carries additional warmth (sunrise amber lives in images, not in UI tokens).

## 4. Spacing and section rhythm

- Base unit 8px; scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Section padding: 128px top/bottom desktop (96 for dense sections), 64-80px
  mobile.
- Chapter gap between unrelated sections may reach 160px on desktop; white
  space is a feature of the direction, not waste.
- Text-to-media gutter inside a split row: 64px desktop, 32px tablet.

## 5. Grid and containers

- 12-column grid, 24px gutters, desktop.
- Containers: `--container-text` 720px (prose), `--container-content` 1200px
  (standard sections), `--container-wide` 1440px (media bands), full-bleed
  reserved for photography bands and footer.
- Editorial split default: text 5 columns, media 6 columns, 1 column gap;
  text sits on the left rail (Amigo-informed proportion, not cloned).

## 6. Buttons

| Variant | Style | Use |
|---|---|---|
| Primary | Blue family fill (final fill token per contrast pass), 10px radius, 16px/28px padding, weight 550 | One per section max: Request a Ride |
| Secondary | Transparent, 1.5px `--hairline` border, ink text | Call dispatch, secondary paths |
| Quiet link | `--blue-ink` text + underline on hover, optional arrow | In-line paths, "Learn more" |
| On-night | Paper fill + ink text (primary), ghost light border (secondary) | Dark chapter and footer |

Minimum target 48x48px; visible focus ring always; no gradients, no shadows
on buttons; active state darkens fill 8%.

## 7. Cards

Flat panels: `--paper-2` or white on paper, 1px hairline, 16px radius,
24-32px padding. No drop-shadow stacks, no icon-grid cards. Card title
serif h3 or sans h4, one supporting line, quiet link. Testimonial cards
(future): tinted panel, quote serif italic 20px, small round portrait,
caps attribution (concept informed by Amigo/Superpower, restyled to our
tokens).

## 8. Image frames

- Radius 16px for in-flow media panels; 0px for full-bleed bands.
- Numbered caption chips (`01 MORNING CHECK`) 12px caps on
  `rgba(10,22,34,0.72)` over image corners, 8px radius.
- Aspect ratios locked per V2-PHOTOGRAPHY-PLAN.md; every `<img>` ships
  `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"`
  for the hero only.
- Treatment: natural color, slight warm grade; no duotones over faces, no
  blue overlays on people.

## 9. Borders and shadows

Hairlines do the separation work. Shadow exists only as one ambient token
`0 8px 24px rgba(14,27,38,0.08)` for floating UI (sticky bars, open menus).
Nothing else casts.

## 10. Motion

- Durations: 150ms (hover/focus), 250ms (reveals), 400ms (page-level
  transitions max). Easing `cubic-bezier(0.2, 0, 0, 1)`.
- Scroll-enter: opacity 0→1 + translateY 12px→0, once per element, no
  re-trigger, stagger max 3 siblings.
- Hover: link underline draw, image scale max 1.02, card hairline darkens.
- Forbidden: parallax, star fields, marquees, autoplay carousels, animated
  counters, siren/flash effects.

### Reduced motion

`@media (prefers-reduced-motion: reduce)`: all reveals render in final
state, transitions collapse to opacity 0ms-linear or none, smooth-scroll
disabled, any ambient looping media paused. This is a hard requirement
(the V1 space theme had none).

## 11. Breakpoints

| Token | Width | Behavior |
|---|---|---|
| `sm` | ≥480px | single column, type at mobile scale |
| `md` | ≥768px | 8-col grid, splits stack → side-by-side where room allows |
| `lg` | ≥1024px | full 12-col, desktop type scale begins (fluid) |
| `xl` | ≥1440px | containers cap; whitespace grows |

Mobile-first CSS; the persistent bottom call/request bar exists below `md`
only.

## 12. Accessibility contrast requirements

- Body text ≥4.5:1; large text (≥24px or 19px bold) ≥3:1; UI component
  boundaries ≥3:1 against adjacent colors.
- Verified pairs: `--ink` on `--paper` ≈ 14.9:1; `--ink-2` on `--paper`
  ≈ 7.2:1; `--blue-ink` on `--paper` ≥ 4.5:1; `--night-text` on `--night`
  ≈ 13.8:1; `--night-muted` on `--night` ≥ 4.5:1. Exact values re-measured
  in Mission 2 with tooling before tokens freeze.
- `#0B9ED9` never carries body text on paper (see blue rules).
- Focus visible on every interactive element; focus ring never removed.
- All type in rem; layout survives 200% zoom and 320px viewports.
