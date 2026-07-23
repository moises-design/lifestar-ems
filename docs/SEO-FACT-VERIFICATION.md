# Life Star EMS — Business Fact Verification Sheet

Date: 2026-07-23

Every item below is currently published (or one import away from being
published) on lifestaremsrgv.com and **must be confirmed by the owner in
writing before any SEO or content work republishes it**. Nothing in this list
should be treated as true because the website says it. Where the site
contradicts itself, both versions are shown.

Legend: 🔴 = conflicting or high-risk claim, 🟡 = unverified claim currently
live, ⚪ = needed but not yet published anywhere.

---

## 1. Identity

| # | Fact | Currently published | Status |
|---|---|---|---|
| 1.1 | Official legal business name | "Life Star EMS" (also "LIFE STAR EMS" in nav/footer). Is the legal entity e.g. "Life Star EMS LLC"? Needed for schema `legalName` and citations. | ⚪ Confirm exact legal name and DBA |
| 1.2 | Years in business / founding year | Not published anywhere. Footer shows only dynamic copyright year. | ⚪ Provide founding year (optional but useful) |
| 1.3 | Owner/operator names for citations | Not published. | ⚪ Optional |

## 2. Phone numbers 🔴

| # | Fact | Currently published | Status |
|---|---|---|---|
| 2.1 | Primary dispatch number | **(956) 660-6543** — used in all 44 UI occurrences (nav, footer, every page CTA, tel: links) | 🟡 Confirm this is the correct, answered dispatch line |
| 2.2 | Conflicting number in search snippets | **(956) 648-9774** — only in `index.html:7` meta description (what Google shows). `README.md:71` reveals it as a template placeholder ("9566489774 → your phone") | 🔴 Confirm it is wrong/dead and may be removed everywhere, or clarify what it is |
| 2.3 | Secondary/office/billing numbers | None published | ⚪ Provide if any (for GBP + citations consistency) |
| 2.4 | Number registered on Google Business Profile / Facebook | Unknown | ⚪ Must match 2.1 everywhere (NAP consistency) |

## 3. Email 🔴

| # | Fact | Currently published | Status |
|---|---|---|---|
| 3.1 | Public email | `lifestarems.rgv@gmail.com` (`src/components/Footer.jsx:46`, `src/components/Contact.jsx:32`, CoverageMap sidebar) | 🟡 Confirm monitored |
| 3.2 | Domain emails seen elsewhere | `info@lifestaremsrgv.com` (README placeholder), `dev@lifestaremsrgv.com` (git author) | 🔴 Decide the one public email; a domain address is recommended over gmail for trust |

## 4. Address

| # | Fact | Currently published | Status |
|---|---|---|---|
| 4.1 | Street address | "2526 W. Freddy Gonzalez, Edinburg TX 78539" (Contact, Footer, service-page CTA boxes). About card omits ZIP. | 🟡 Confirm exact USPS format — is it "2526 W Freddy Gonzalez **Dr**, Edinburg, TX 78539"? Suite number? |
| 4.2 | Is this address public-facing (patients/mail) or dispatch-only? | Implied public | ⚪ Confirm it should appear on the site, GBP, and schema (vs. service-area business with hidden address) |

## 5. Hours 🔴

| # | Fact | Currently published | Status |
|---|---|---|---|
| 5.1 | Office hours | "Mon–Sat · Flexible Scheduling" (`src/components/Contact.jsx:34`) | 🔴 Conflicts with 5.2 |
| 5.2 | Service availability | "Available 7 days a week" (`src/pages/DialysisTransport.jsx:62`); broken string "Available Scheduled" (`DialysisTransport.jsx:72`, `RequestCoverage.jsx:82`) | 🔴 Provide true dispatch hours and true transport-availability days; the "Available Scheduled" strings must be rewritten |
| 5.3 | 24/7 claim | "Available 24/7" only in the stale meta description (`index.html:7`) | 🔴 Confirm NOT 24/7 so it can be removed (or confirm 24/7 if true) |

## 6. Emergency vs. non-emergency language 🔴

| # | Fact | Currently published | Status |
|---|---|---|---|
| 6.1 | Service type | UI: scheduled non-emergency transport + event standby; form note "non-emergency scheduling only" (`RequestCoverage.jsx:72`). Meta description: "emergency and non-emergency ... 24/7" (`index.html:7`). Keywords tag: "ambulance, emergency medical" (`index.html:8`) | 🔴 Confirm official positioning: NEMT + EMS standby only, no emergency response. All emergency wording will then be removed from metadata |
| 6.2 | 911 disclaimer | Component exists but is deliberately not rendered (`src/components/EmergencyBar.jsx`; commits "no 911") | ⚪ Confirm whether a small "In an emergency, call 911" notice may be added near contact points (recommended for liability) |

## 7. Licensing and certifications 🟡

| # | Fact | Currently published | Status |
|---|---|---|---|
| 7.1 | "Licensed and certified EMS professionals" (`About.jsx:6`) | 🟡 Provide Texas DSHS EMS Provider License number and licensed level(s) |
| 7.2 | "BLS/ALS Certified Crews" (`Hero.jsx:7`); "BLS/ALS Licensed" (`EventStandby.jsx:65`) | 🟡 Confirm: is the provider licensed for **both** BLS and ALS? Which is offered for NEMT vs. event standby? |
| 7.3 | "Certified EMT and Paramedic crews" (`EventStandby.jsx:113`) | 🟡 Confirm paramedic (ALS) staffing is standard vs. optional |
| 7.4 | Any other credentials (TDLR, insurance carrier requirements, TXDOT) | ⚪ Provide any that may be displayed |

## 8. Insurance and payment 🟡

| # | Fact | Currently published | Status |
|---|---|---|---|
| 8.1 | "Medicare, Medicaid & major insurance accepted" (`About.jsx:13`) | 🟡 Confirm enrollment status for Medicare and Texas Medicaid (NEMT is usually via managed-care brokers — confirm exact billing relationships) |
| 8.2 | Orphaned insurer list (`Insurance.jsx:3-18`): BCBS, Molina, Ambetter, UnitedHealthcare, Cigna, Humana, Wellcare/Allwell, Aetna, Driscoll Children's, Healthspring, Superior HealthPlan, Medicare, Medicaid/CSHCN, Private | 🟡 Confirm each named plan individually before this section is ever re-enabled; remove any that cannot be substantiated |
| 8.3 | "Free evaluation" / "Insurance verified before first trip" / "Request Free Quote" (Dialysis, Therapy, Pediatrics, Events pages) | 🟡 Confirm free verification/quote is policy |
| 8.4 | Private-pay rates / payment methods | Not published | ⚪ Optional |

## 9. Service catalog and limits

| # | Fact | Currently published | Status |
|---|---|---|---|
| 9.1 | Four services: dialysis (adults), pediatric therapy (PT/OT/speech), pediatric long-distance (Texas), event EMS standby | 🟡 Confirm this is the complete, current catalog |
| 9.2 | Long-distance scope: "across Texas", named Houston, San Antonio, Dallas, Corpus Christi, Austin, El Paso; "+ All of Texas" (`CoverageMap.jsx:22-29,181`) | 🟡 Confirm statewide service is truly offered, adults vs. pediatric-only, and any mileage/border limits |
| 9.3 | Long-distance is labeled pediatric-only in places ("Long-distance pediatric transport statewide", `CoverageMap.jsx:183`) but the orphaned LongDistanceTransport page implies general | 🔴 Clarify: pediatric-only or all ages? |
| 9.4 | Wheelchair capability: "Wheelchair accessible" (`Services.jsx:12`), "Wheelchair and stretcher accessible vehicles" (`DialysisTransport.jsx:62`) | 🟡 Confirm wheelchair AND stretcher capability per vehicle type |
| 9.5 | Child safety seats (`PediatricsTransport.jsx:157`) | 🟡 Confirm |
| 9.6 | "Parent or guardian always welcome to ride along" (Therapy/Pediatrics) | 🟡 Confirm policy |
| 9.7 | Response-time promises: contact "within 2 hours" (`RequestCoverage.jsx:28,41`), quote "within 24 hours" (`EventStandby.jsx:118`) | 🔴 Confirm operationally honored, or soften |
| 9.8 | Event equipment list: "Fully equipped ambulance on site", "AED, oxygen", "Post-event incident reports" (`EventStandby.jsx:113`) | 🟡 Confirm standard inclusions |

## 10. Service area

| # | Fact | Currently published | Status |
|---|---|---|---|
| 10.1 | RGV cities listed (`CoverageMap.jsx:6-19`): Edinburg (HQ), McAllen, Mission, Pharr, San Juan, Alamo, Donna, Weslaco, Mercedes, Harlingen, Los Fresnos, Brownsville, Rio Grande City | 🟡 Confirm each city is actually served for scheduled transport |
| 10.2 | Counties implied: Hidalgo, Cameron, Starr (SVG map) | 🟡 Confirm; Willacy County (Raymondville) is absent — intentional? |
| 10.3 | "…and all surrounding areas" (`RequestCoverage.jsx:94`) | 🟡 Confirm radius policy |

## 11. Reviews and reputation 🔴

| # | Fact | Currently published | Status |
|---|---|---|---|
| 11.1 | "★ 5.0 Google Rated" (`Hero.jsx:9`) | 🔴 Provide the Google Business Profile link and current rating/review count. If no GBP exists or rating differs, this claim comes down |
| 11.2 | "Trusted Families" badge (`TherapyTransport.jsx:116`), "The RGV's Trusted Transport Provider" (`About.jsx:23`) | 🟡 Superlatives; acceptable as marketing if not tied to fake metrics |

## 12. Organizational relationships 🔴

Published under "Trusted By / Community Partners" (`EventStandby.jsx:19-27`):
Boys & Girls Club of McAllen, PSJA ISD, Mission CISD, Sharyland ISD,
Edinburg CISD, UTRGV, Special Olympics Texas.

- 🔴 For each: confirm a real service relationship exists (past or standing),
  and obtain written permission to name them (school districts and Special
  Olympics actively police their marks). Remove any that fail either test.
- ⚪ Also list relationships with dialysis centers, therapy clinics, or
  hospital systems (Driscoll?) that could be legitimately referenced and used
  for local citations/backlinks.

## 13. Languages and accessibility accommodations

| # | Fact | Currently published | Status |
|---|---|---|---|
| 13.1 | "Bilingual staff — English & Spanish" (5 pages) | 🟡 Confirm every crew/dispatcher, or soften to "Spanish-speaking staff available" |
| 13.2 | Accessibility accommodations (door-to-door assist, oxygen during NEMT, bariatric capacity) | ⚪ Provide details for content and schema |

## 14. Operations behind the site

| # | Fact | Status |
|---|---|---|
| 14.1 | Who monitors Supabase `contact_submissions`? Is there an email/SMS alert? | ⚪ Required before relying on forms |
| 14.2 | Access to the production Vercel account (owner of lifestar-ems-brown.vercel.app) | 🔴 Required before any deployment work (see DEPLOYMENT-AUDIT.md) |
| 14.3 | Google Business Profile: exists? verified? category? | ⚪ Required for Mission 8 |
| 14.4 | Google Search Console / Bing Webmaster / Apple Business Connect access | ⚪ Required for Missions 8-9 |
| 14.5 | Facebook page facebook.com/LifeStarEMSRGV is owned and active | 🟡 Confirm |
| 14.6 | Domain registrar (README suggests Squarespace nameservers → Vercel) | ⚪ Confirm registrar access for DNS work |

---

## How to use this sheet

Reply with corrections/confirmations inline (or a filled copy). Items marked 🔴
block publication of related copy; items marked 🟡 stay as-is until confirmed
but will not be amplified (no new pages will repeat them); items marked ⚪ are
inputs for future missions.
