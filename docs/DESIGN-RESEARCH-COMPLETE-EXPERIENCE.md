# Design Research — Complete Experience Mission

Mission: Complete Life Star EMS Website Experience, Visual, Trust, Privacy,
Accessibility, SEO, and Lead-Handling Transformation. Branch:
`claude/lifestar-complete-experience-redesign`.

## Mobbin research — blocked

The mission's Phase 1 asked for competitive/reference design research via
Mobbin, with an explicit contingency: "if blocked, document and continue,
do not pretend it succeeded."

Mobbin is configured in this environment as an MCP connector requiring
interactive OAuth authorization. This session is non-interactive
(automated remote execution), so the OAuth flow cannot run here. `ToolSearch`
confirms no Mobbin tools are loaded or reachable in this session. This is
an environment/authorization limitation, not a transient failure — it will
recur on any non-interactive run until the connector is authorized by the
owner via claude.ai connector settings or an interactive `claude mcp`
session.

**Status: blocked, documented, proceeding without it**, per the mission's
own instruction.

## What this mission proceeds on instead

In place of external competitive research, this mission builds directly on
top of:

1. **The existing V2 "Calm Response" design system** already established
   in this repository (`src/v2/tokens.css`, `src/v2/v2.css`,
   `src/v2/InnerPage.jsx`) — warm ivory/paper background, white cards, dark
   ink text, Life Star blue primary, a single deliberate dark "night"
   chapter pattern via compact contained `.v2-cta-card` accents (never
   full-bleed dark bands), Source Serif 4 headings, Inter body. This system
   is confirmed correct and consistent everywhere it has been applied
   (`docs/COMPLETE-EXPERIENCE-AUDIT.md` §14) and is treated as the
   foundation to extend, not replace.
2. **The mission's own detailed Phase 4/5 specification** — named shared
   component list (PageIntro, SectionHeader, MediaSplit, ServiceCard,
   IconCard, FactsStrip, PhotoGrid, CTASection, ContactCard, FormField,
   FormStatus, PrivacyNotice, ResponsivePicture, AccessibleIcon), icon
   sizing/containment rules, and per-page treatment guidance — which
   already encodes the intended visual outcome in enough detail to build
   from directly.
3. **`docs/COMPLETE-EXPERIENCE-AUDIT.md`**, completed immediately before
   this document, which maps every current gap (empty placeholders,
   emoji-as-icon, broken embeds, fact-risk copy, missing routes, dead
   code/assets, accessibility gaps) against the mission's 30 phases.
4. **Prior missions' own design decisions**, especially
   `docs/THEME-CONSISTENCY-AUDIT.md` (the V1→V2 dark-theme removal) and
   `docs/SEO-FACT-VERIFICATION.md` (fact discipline), which this mission
   extends rather than re-derives.

No fabricated "Mobbin found X" claims appear anywhere in this repository.
If Mobbin access is authorized later, a follow-up design-research pass can
be run as a separate, explicitly-scoped task.
