import { Link } from 'react-router-dom'
import {
  FaMapMarkerAlt, FaCalendarAlt, FaShieldAlt, FaUsers, FaClock,
  FaWheelchair, FaHandsHelping, FaChild, FaBriefcaseMedical, FaRoute,
  FaLandmark,
} from 'react-icons/fa'
import { content } from './content'
import { gov } from './content/government'
import CommunityShowcase from './CommunityShowcase'
import Picture from './Picture'
import { ServiceCard, AccessibleIcon, Reveal } from './components'
import './HomeV2.css'

const { brand, nav, home } = content
const coverageCities = home.coverage.cities

// Splits the hero heading around its emphasized phrase (both come from
// the same content entry, so they can never drift out of sync).
const heroEmphasisIndex = home.hero.heading.indexOf(home.hero.emphasis)
const heroHeadingBefore = heroEmphasisIndex >= 0 ? home.hero.heading.slice(0, heroEmphasisIndex) : home.hero.heading
const heroHeadingAfter = heroEmphasisIndex >= 0
  ? home.hero.heading.slice(heroEmphasisIndex + home.hero.emphasis.length)
  : ''

const serviceIcons = {
  '/services/dialysis': FaWheelchair,
  '/services/long-distance': FaRoute,
  '/services/events': FaBriefcaseMedical,
  '/services/therapy': FaHandsHelping,
  '/services/pediatrics': FaChild,
}

const heroTrustIcons = [FaCalendarAlt, FaShieldAlt, FaUsers, FaClock]

// Editorial photo mosaic: four real, distinct photographs, deliberately
// varied in shape and role (one large "feature" plus three supporting
// shots) instead of a uniform grid of identical squares. The sunset
// ambulance photo lives in the hero now, so it is not repeated here.
const mosaicPhotos = [
  {
    role: 'feature',
    src: '/images/company/optimized/event-mission-stadium.jpg',
    webp: '/images/company/optimized/event-mission-stadium.webp',
    alt: 'Life Star EMS personnel and medical transport equipment supporting an athletic event at Tom Landry Stadium.',
  },
  {
    role: 'b',
    src: '/images/optimized/photo-2.jpg',
    webp: '/images/optimized/photo-2.webp',
    alt: 'A Life Star EMS ambulance parked near a South Texas medical facility.',
  },
  {
    role: 'c',
    src: '/images/company/optimized/ambulance-american-flag.jpg',
    webp: '/images/company/optimized/ambulance-american-flag.webp',
    alt: 'A Life Star EMS ambulance parked beneath a large American flag at dusk.',
  },
  {
    role: 'd',
    src: '/images/company/optimized/medical-transport-van.jpg',
    webp: '/images/company/optimized/medical-transport-van.webp',
    alt: 'A Life Star EMS medical transport van parked at a roadside stop in South Texas.',
  },
]

// Verified buyer types, reused verbatim from the Government Contracting
// page's own overview list (src/v2/content/government.js) rather than
// restated or expanded here.
const govBuyerTypes = [
  'School districts', 'Universities', 'Cities and counties',
  'Healthcare systems', 'Emergency management organizations', 'Prime contractors',
]

export default function HomeV2() {
  return (
    <div className="v2 v2-home">

      {/* 01 · Premium hero: two-column on desktop (content left, real
          ambulance photo right), single column on mobile with the photo
          placed right after the headline. */}
      <section className="v2-section v2home-hero" aria-labelledby="hero-h">
        <div className="v2-container v2home-hero-grid">
          <span className="v2-label v2home-hero-eyebrow">{home.hero.eyebrow}</span>
          <h1 id="hero-h" className="v2-display v2home-hero-h">
            {heroHeadingBefore}
            <span className="v2home-hero-emphasis">{home.hero.emphasis}</span>
            {heroHeadingAfter}
          </h1>
          <p className="v2-lead v2home-hero-lead">{home.hero.lead}</p>
          <div className="v2home-hero-btns">
            <Link to={nav.requestCta.href} className="v2-btn v2-btn-primary">{nav.requestCta.label}</Link>
            <a href={brand.phoneHref} className="v2-btn v2-btn-secondary">{nav.callLabel} {brand.phoneDisplay}</a>
          </div>
          <ul className="v2home-hero-trust" aria-label="Life Star EMS at a glance">
            {home.hero.trust.map((item, i) => {
              const Icon = heroTrustIcons[i]
              const body = (
                <>
                  <AccessibleIcon icon={Icon} size={16} />
                  <span>{item.label}</span>
                </>
              )
              return (
                <li key={item.label}>
                  {item.href
                    ? <Link to={item.href} className="v2home-hero-trust-link">{body}</Link>
                    : <span className="v2home-hero-trust-static">{body}</span>}
                </li>
              )
            })}
          </ul>

          <div className="v2home-hero-media">
            <div className="v2home-hero-glow" aria-hidden="true" />
            <div className="v2home-hero-photo-frame">
              <Picture
                src="/images/company/optimized/ambulance-sunset.jpg"
                webp="/images/company/optimized/ambulance-sunset.webp"
                alt="A Life Star EMS ambulance parked at a school stadium track at sunset."
                width={414}
                height={414}
                loading="eager"
                fetchPriority="high"
                className="v2home-hero-photo"
              />
            </div>
            {home.hero.badges.map((badge, i) => (
              <div key={badge.label} className={`v2home-hero-badge v2home-hero-badge-${i + 1}`}>
                {badge.label}
              </div>
            ))}
            <p className="v2-small v2home-hero-local">{home.hero.local}</p>
          </div>
        </div>
      </section>

      {/* 02 · Service discovery: five clickable service cards */}
      <section className="v2-section v2-hairline-top" id={home.services.id} aria-labelledby="services-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{home.services.label}</span>
            <h2 id="services-h">{home.services.heading}</h2>
          </div>
          <div className="v2home-services-grid">
            {home.services.items.map((item, i) => (
              <Reveal key={item.href} style={{ transitionDelay: `${i * 60}ms` }}>
                <ServiceCard
                  icon={serviceIcons[item.href]}
                  title={item.title}
                  description={item.line}
                  href={item.href}
                  cta={home.services.linkLabel}
                />
              </Reveal>
            ))}
          </div>
          <Link to={home.services.allHref} className="v2home-quiet-link v2home-services-all">{home.services.allLabel} &rarr;</Link>
        </div>
      </section>

      {/* Credibility strip: verified facts only, no counters */}
      <section className="v2home-credibility v2-hairline-top" id={home.credibility.id} aria-label="Life Star EMS credibility">
        <div className="v2-container">
          <ul className="v2home-credibility-list">
            {home.credibility.items.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      {/* 03 · How scheduling works */}
      <section className="v2-section v2-hairline-top" id={home.how.id} aria-labelledby="how-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{home.how.label}</span>
            <h2 id="how-h">{home.how.heading}</h2>
          </div>
          <ol className="v2home-steps">
            {home.how.steps.map(step => (
              <li key={step.num} className="v2home-step">
                <span className="v2home-step-num" aria-hidden="true">{step.num}</span>
                <h3 className="v2home-step-title">{step.title}</h3>
                <p className="v2home-step-line">{step.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 · Human trust story, backed by a real leadership photo */}
      <section className="v2-section v2-hairline-top" id={home.why.id} aria-labelledby="why-h">
        <div className="v2-container v2home-split">
          <div>
            <span className="v2-label">{home.why.label}</span>
            <h2 id="why-h" className="v2home-split-h">{home.why.heading}</h2>
            <p className="v2-lead">{home.why.line}</p>
          </div>
          <div className="v2-panel v2home-photo-slot">
            <Picture
              src="/images/company/optimized/heather-ayala-segovia-seated-full.jpg"
              webp="/images/company/optimized/heather-ayala-segovia-seated-full.webp"
              alt="Heather Ayala-Segovia, CEO of Life Star EMS, seated portrait."
              width={1050}
              height={1400}
              loading="lazy"
              className="v2home-photo-slot-img"
            />
          </div>
        </div>
      </section>

      {/* 05 · Real photography: an asymmetric editorial mosaic */}
      <section className="v2-section v2-hairline-top" id={home.operations.id} aria-labelledby="ops-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{home.operations.label}</span>
            <h2 id="ops-h">{home.realOps.heading}</h2>
            <p className="v2-lead">{home.realOps.line} {home.operations.line}</p>
          </div>
          <Reveal as="ul" className="v2home-mosaic" aria-label={home.realOps.heading}>
            {mosaicPhotos.map(p => (
              <li key={p.src} className={`v2home-mosaic-item v2home-mosaic-${p.role} v2-panel`}>
                <Picture
                  src={p.src}
                  webp={p.webp}
                  alt={p.alt}
                  width={414}
                  height={414}
                  loading="lazy"
                  className="v2home-mosaic-photo"
                />
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 06 · Coverage: a real, verified list of cities served */}
      <section className="v2-section" id={home.coverage.id} aria-labelledby="cov-h">
        <div className="v2-container v2home-split">
          <div>
            <span className="v2-label">{home.coverage.label}</span>
            <h2 id="cov-h" className="v2home-split-h">{home.coverage.heading}</h2>
            <p className="v2-lead">{home.coverage.line}</p>
            <Link to={home.coverage.href} className="v2home-quiet-link">{home.coverage.linkLabel}</Link>
          </div>
          <div className="v2-panel v2home-coverage-panel">
            <div className="v2home-coverage-head">
              <span className="v2home-coverage-dot" aria-hidden="true" />
              <span className="v2home-coverage-label">Rio Grande Valley, headquartered in Edinburg</span>
            </div>
            <ul className="v2home-cities" aria-label="Cities we serve">
              {coverageCities.map(city => (
                <li key={city} className={city === 'Edinburg' ? 'v2home-city-hq' : undefined}>
                  {city === 'Edinburg' && <FaMapMarkerAlt aria-hidden="true" />}
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 07 · Event standby door */}
      <section className="v2-section v2-hairline-top" id={home.events.id} aria-labelledby="ev-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{home.events.label}</span>
            <h2 id="ev-h">{home.events.heading}</h2>
            <p className="v2-lead">{home.events.line}</p>
          </div>
          <Link to={home.events.href} className="v2-btn v2-btn-secondary">{home.events.linkLabel}</Link>
        </div>
      </section>

      {/* 08 · Audience paths */}
      <section className="v2-section v2-hairline-top" id={home.paths.id} aria-labelledby="paths-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{home.paths.label}</span>
            <h2 id="paths-h">{home.paths.heading}</h2>
          </div>
          <div className="v2home-paths">
            {home.paths.items.map(p => (
              <div key={p.title} className="v2home-path-card">
                <h3 className="v2home-path-title">{p.title}</h3>
                <p className="v2home-path-line">{p.line}</p>
                <Link to={p.href} className="v2home-quiet-link">{p.linkLabel}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Small leadership / human-trust block */}
      <section className="v2-section-dense v2-hairline-top" id={home.leadership.id} aria-labelledby="lead-h">
        <div className="v2-container v2home-leadership">
          <div className="v2-panel v2home-leadership-photo-frame">
            <Picture
              src="/images/company/optimized/heather-ayala-segovia-seated-close.jpg"
              webp="/images/company/optimized/heather-ayala-segovia-seated-close.webp"
              alt="Heather Ayala-Segovia, CEO of Life Star EMS, portrait."
              width={1100}
              height={1375}
              loading="lazy"
              className="v2home-leadership-photo"
            />
          </div>
          <div>
            <span className="v2-label">{home.leadership.label}</span>
            <h2 id="lead-h" className="v2home-leadership-h">{home.leadership.heading}</h2>
            <p className="v2-lead">{home.leadership.body}</p>
            <p className="v2home-leadership-name">{home.leadership.name}</p>
            <p className="v2-small v2home-leadership-title">{home.leadership.title}</p>
            <Link to={home.leadership.href} className="v2home-quiet-link">{home.leadership.linkLabel} &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Government and institutional services: elevated, contained,
          blue-accented night chapter (matching the site's single
          established dark-section pattern, not a full-bleed band). */}
      <section className="v2-section-dense v2-hairline-top" id="government" aria-labelledby="gov-h">
        <div className="v2-container">
          <Reveal className="v2-night v2home-gov">
            <div className="v2home-gov-glow" aria-hidden="true" />
            <div className="v2home-gov-content">
              <div className="v2home-gov-icon"><AccessibleIcon icon={FaLandmark} size={22} /></div>
              <h2 id="gov-h" className="v2home-gov-h">{gov.homepage.heading}</h2>
              <p className="v2-lead v2home-gov-line">{gov.homepage.line}</p>
              <ul className="v2home-gov-buyers">
                {govBuyerTypes.map(b => <li key={b}>{b}</li>)}
              </ul>
              <div className="v2home-gov-btns">
                <Link to={gov.route} className="v2-btn v2-btn-primary">{gov.homepage.viewLabel}</Link>
                <a href={gov.pdfPublicPath} download className="v2-btn v2-btn-secondary">{gov.homepage.downloadLabel}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11 · Life Star in the Community: Facebook media showcase */}
      <CommunityShowcase />

      {/* 12 · FAQ */}
      <section className="v2-section v2-hairline-top" id={home.faq.id} aria-labelledby="faq-h">
        <div className="v2-container-text v2home-faq-wrap">
          <div className="v2-section-head">
            <span className="v2-label">{home.faq.label}</span>
            <h2 id="faq-h">{home.faq.heading}</h2>
          </div>
          <div className="v2home-faq">
            {home.faq.items.map(item => (
              <details key={item.q} className="v2home-faq-item">
                <summary className="v2home-faq-q">{item.q}</summary>
                <p className="v2home-faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13 · CTA band — a compact dark-accent card, not a full-bleed band */}
      <section className="v2-section-dense" id={home.cta.id} aria-labelledby="cta-h">
        <div className="v2-container">
          <div className="v2-night v2-cta-card v2home-cta">
            <div>
              <h2 id="cta-h">{home.cta.heading}</h2>
              <p className="v2-lead">{home.cta.line}</p>
            </div>
            <div className="v2home-cta-btns">
              <Link to={nav.requestCta.href} className="v2-btn v2-btn-primary">{home.cta.requestLabel}</Link>
              <a href={brand.phoneHref} className="v2-btn v2-btn-secondary">{brand.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
