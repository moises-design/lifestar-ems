# Production Content Claim Audit

Compiled as part of the production visual/content/service-positioning
repair on branch `claude/lifestar-production-site-repair`. Scope: every
visible claim on `/services/dialysis`, `/services/therapy`,
`/services/pediatrics`, `/services/long-distance`, `/services/events`,
`/coverage`, and `/request`, checked against
`docs/source/Life_Star_EMS_Capability_Statement.pdf` (the committed
source of truth) and the site's own DSHS licensing field
("Current, Ground Only, BLS").

Statuses: **Verified** (matches the capability statement or DSHS
licensing field), **Owner-confirmed** (no independent document backs
it, but it describes a routine operational practice rather than a
factual claim requiring evidence), **Qualified** (rewritten from an
absolute/guarantee form to a conditional, accurate one), **Removed**
(claim deleted outright), **Needs owner verification** (flagged, not
resolved — see note at the end of the table).

| Route | Existing claim | Evidence source | Status | Final wording | Reason |
|---|---|---|---|---|---|
| /services/dialysis | Section titled "Punctual." implying an on-time guarantee | No documented on-time guarantee | Qualified | "Reliable." (section retitled "Our Approach") | "Punctual" as a section label implies every trip arrives on schedule, which isn't a documented commitment. |
| /services/dialysis | "Insurance verified before your first trip" | No documented formal insurance-verification process | Qualified | "Insurance details confirmed before your first trip" | "Verified" implies a formal payer-side check; "confirmed" accurately describes an intake conversation. |
| /services/therapy | "Parent or guardian always welcome to ride along" | No documented vehicle-capacity guarantee | Qualified | "Parent or guardian welcome to ride along, space permitting" | Vehicle capacity varies by trip; an unconditional "always" overstates what can be guaranteed. |
| /services/therapy | Insurance verified/accepted wording (site-wide pattern) | Same as above | Qualified | "Insurance details confirmed before first ride" | Same reasoning as the dialysis page. |
| /services/pediatrics | "Reliable & On-Time" feature heading | No documented on-time guarantee | Qualified | "Coordinated Scheduling" | Replaces an implied punctuality guarantee with an accurate description of the scheduling process. |
| /services/pediatrics | "Parent or guardian always welcome to ride along" | No documented vehicle-capacity guarantee | Qualified | "Parent or guardian welcome to ride along, space permitting" | Same reasoning as the therapy page. |
| /services/pediatrics | "Long-distance transport across all of Texas" | Capability statement: long-distance/interstate transport offered, no statewide-guarantee language | Qualified | "Long-distance transport coordinated across Texas" | "All of Texas" reads as a coverage guarantee; "coordinated across" matches the capability statement's conditional framing. |
| /services/long-distance | "BLS-certified crews on every trip" | DSHS field: "Current, Ground Only, BLS" | Qualified | "BLS-certified crews" | The underlying BLS-crew claim is verified; "on every trip" is a staffing guarantee not independently confirmable and was dropped. |
| /services/long-distance | Interstate transport to Michigan and California | Capability statement documents Michigan/California experience | Verified | "we coordinate trips across Texas and have transported patients interstate, including to Michigan and California" | Directly supported by the capability statement. |
| /services/long-distance | 24/7 dispatch | Capability statement lists 24/7 dispatch capability | Verified | "24/7 dispatch" | Directly supported by the capability statement. |
| /services/long-distance | "Request a Free Quote" CTA | No documented free/formal-quote process | Removed | "Request Long-Distance Transport" | Pricing isn't confirmed until intake; "free quote" implies a defined no-cost estimate process that isn't documented. |
| /services/long-distance | Form note: "For a medical emergency, call 911." | Mission Phase 1/12: sitewide banner and 911/non-emergency language removal | Removed | "Call dispatch for immediate coordination." | This is a scheduled-transport request form; the 911 line implied a false emergency-response affiliation and duplicated the removed sitewide banner. |
| /services/events | "Certified EMT and Paramedic crews" | DSHS field: "Current, Ground Only, BLS" (no ALS/paramedic licensure on file) | Removed | "BLS ambulance and trained EMS personnel configured according to the approved event coverage plan." | "Paramedic" implies ALS-level licensure that isn't verified; the site's own fact-safety policy (tests/unit/fact-safety.test.js) forbids ALS-licensing claims. |
| /services/events | "Fast on-site medical response" | No documented response-time data | Removed | (dropped; folded into the BLS wording above) | Implies a response-time guarantee that can't be substantiated. |
| /services/events | "Fully equipped ambulance on site" | Same BLS-only constraint as above | Qualified | Folded into "BLS ambulance and trained EMS personnel configured according to the approved event coverage plan." | Avoids restating an on-site-guarantee claim independent of the approved coverage plan. |
| /services/events | Event coverage for crowds up to ~5,000 | Capability statement: crowds up to approximately 5,000 | Verified | "Event coverage experience for crowds of up to approximately 5,000" | Directly supported by the capability statement. |
| /services/events | "Request Free Quote" CTA | No documented free/formal-quote process | Removed | "Request Event Coverage" | Same reasoning as the long-distance page. |
| /services/events | Form note: "For a medical emergency, call 911." | Mission Phase 1/8/12 | Removed | "Submitting this request does not confirm staffing, pricing, or event coverage — our team will follow up to confirm availability. Call dispatch for immediate coordination." | Removes the emergency framing and states plainly that a submission is a request, not a confirmation. |
| /coverage | Duplicated "Where we serve" / "Service area" heading text appearing twice in quick succession (page H1 intro, then the map component's own section header) | N/A — layout/structure issue, not a factual claim | Qualified | Page keeps a single "Where we serve" H1; the map component's own heading was changed from a redundant "Service area" label to the distinct "Cities we serve" | Two near-identical headings back to back read as an accidental duplicate; the fix keeps both headings but makes them distinct and non-redundant. |
| /coverage | Long-distance description implying scheduled/event coverage only, with long-distance treated as a pediatric-specific service elsewhere on the site | Capability statement: long-distance/interstate patient transport is a general capability, not pediatric-restricted | Qualified | "Scheduled transportation and event standby across the Rio Grande Valley. Long-distance patient transportation is available based on patient needs, scheduling, crew requirements, and destination. Contact us to confirm availability for your location and schedule." | Matches the capability statement's general (not pediatric-only) framing of long-distance transport and avoids an unconfirmed statewide-availability promise. |
| /request | (new) submission-confirmation notice | Mission Phase 12 exact wording | Verified | "Submitting this form does not confirm transportation, crew availability, pricing, or scheduling. Our team will contact you to review and confirm the request. Call dispatch for immediate coordination." | Mission-specified exact text; makes explicit that a form submission is a request, not a confirmed booking. |
| /request | Sidebar "Contact Dispatch Directly" | Mission Phase 1/12: 911/non-emergency language removal from Request page | Removed (911 framing) | "For immediate coordination or time-sensitive requests, call dispatch directly." | Previously appended emergency-adjacent language; now states the practical reason to call without implying emergency-response capability. |
| /request | "Services Available" list item "Pediatric & Long-Distance Transport" | Same long-distance-scope issue as /coverage | Qualified | Split into two separate list items: "Pediatric Transportation" and "Long-Distance Medical Transport" | Combining them in one bullet implied long-distance transport is a pediatric-only service, which isn't accurate per the capability statement. |

## Flagged for owner verification (not resolved by this repair)

- **BLS vs. ALS conflict in the source-of-truth document itself.** The
  capability statement (`docs/source/Life_Star_EMS_Capability_Statement.pdf`)
  lists "BLS and ALS ambulance transportation" as a capability, while the
  site's own DSHS Provider field states "Current, Ground Only, BLS" (a
  BLS-only license) and `tests/unit/fact-safety.test.js` enforces "no
  ALS-provider licensing claim" as a hard policy. This repair treated the
  DSHS field as authoritative and did not add or retain any ALS-specific
  claim anywhere on the site. The owner should confirm which document is
  current and correct the capability statement if the ALS reference is
  outdated.
- **Insurance "confirmed"/"verified" language.** Every service page
  describes insurance details being confirmed before the first trip. This
  repair softened "verified" to "confirmed" everywhere to avoid implying a
  formal payer-side verification process, but no document was available to
  confirm what the actual intake process is. The owner should confirm the
  real process so this wording can be tightened further if appropriate.
