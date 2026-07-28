import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { content } from './content'
import { gov } from './content/government'
import CommunityShowcase from './CommunityShowcase'
import Picture from './Picture'
import './HomeV2.css'

const { brand, nav, home } = content
const coverageCities = home.coverage.cities

// Real-operations strip: a restrained selection of authentic Life Star EMS
// photography (three new event/fleet photos plus one existing ambulance
// photo), not a gallery. Alt text describes what each photo shows without
// claiming a fleet count, unit status, or event relationship beyond what
// the photo itself shows.
const realOpsPhotos = [
  {
    src: '/images/company/optimized/ambulance-sunset.jpg',
    webp: '/images/company/optimized/ambulance-sunset.webp',
    alt: 'A Life Star EMS ambulance parked at a school stadium track at sunset.',
  },
  {
    src: '/images/company/optimized/event-mission-stadium.jpg',
    webp: '/images/company/optimized/event-mission-stadium.webp',
    alt: 'Life Star EMS personnel and medical transport equipment supporting an athletic event at Tom Landry Stadium.',
  },
  {
    src: '/images/company/optimized/medical-transport-van.jpg',
    webp: '/images/company/optimized/medical-transport-van.webp',
    alt: 'A Life Star EMS medical transport van parked at a roadside stop in South Texas.',
  },
  {
    src: '/images/optimized/photo-2.jpg',
    webp: '/images/optimized/photo-2.webp',
    alt: 'A Life Star EMS ambulance parked near a South Texas medical facility.',
  },
]

// V2 homepage shell: establishes section order, rhythm, IDs, and
// responsive structure. Sections carry real, verified copy at minimal
// depth; they are deepened in Missions 3 to 6 without structural change.
export default function HomeV2() {
  return (
    <div className="v2 v2-home">

      {/* 02 · Editorial hero (deepened in Mission 3) */}
      <section className="v2-section v2home-hero" aria-labelledby="hero-h">
        <div className="v2-container">
          <span className="v2-label">{home.hero.eyebrow}</span>
          <h1 id="hero-h" className="v2-display v2home-hero-h">{home.hero.heading}</h1>
          <p className="v2-lead v2home-hero-lead">{home.hero.lead}</p>
          <div className="v2home-hero-btns">
            <Link to={nav.requestCta.href} className="v2-btn v2-btn-primary">{nav.requestCta.label}</Link>
            <a href={brand.phoneHref} className="v2-btn v2-btn-secondary">{nav.callLabel} {brand.phoneDisplay}</a>
          </div>
          <div className="v2-panel v2home-hero-media">
            <Picture
              src="/images/company/optimized/ambulance-american-flag.jpg"
              webp="/images/company/optimized/ambulance-american-flag.webp"
              alt="A Life Star EMS ambulance parked beneath a large American flag at dusk."
              width={414}
              height={414}
              loading="eager"
              fetchPriority="high"
              className="v2home-hero-photo"
            />
          </div>
          <p className="v2-small v2home-hero-local">{home.hero.local}</p>
        </div>
      </section>

      {/* 03 · Numbered service index */}
      <section className="v2-section v2-hairline-top" id={home.services.id} aria-labelledby="services-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{home.services.label}</span>
            <h2 id="services-h">{home.services.heading}</h2>
          </div>
          <ul className="v2home-index">
            {home.services.items.map(item => (
              <li key={item.href} className="v2home-index-row">
                <Link to={item.href} className="v2home-index-link">
                  <span className="v2home-index-num" aria-hidden="true">{item.num}</span>
                  <span className="v2home-index-body">
                    <span className="v2home-index-title">{item.title}</span>
                    <span className="v2home-index-line">{item.line}</span>
                  </span>
                  <span className="v2home-index-cta" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to={home.services.allHref} className="v2home-quiet-link v2home-services-all">{home.services.allLabel} &rarr;</Link>
        </div>
      </section>

      {/* 04 · How scheduling works */}
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

      {/* 05 · Human trust story, backed by a real leadership photo */}
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

      {/* 06 · Real operations + crew, one photo-led section (previously two
          thin back-to-back sections: a photo strip and a text-only block) */}
      <section className="v2-section v2-hairline-top" id={home.operations.id} aria-labelledby="ops-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{home.operations.label}</span>
            <h2 id="ops-h">{home.operations.heading}</h2>
            <p className="v2-lead">{home.realOps.line} {home.operations.line}</p>
          </div>
          <ul className="v2home-realops-grid" aria-label={home.realOps.heading}>
            {realOpsPhotos.map(p => (
              <li key={p.src} className="v2home-realops-frame v2-panel">
                <Picture
                  src={p.src}
                  webp={p.webp}
                  alt={p.alt}
                  width={414}
                  height={414}
                  loading="lazy"
                  className="v2home-realops-photo"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 · Coverage: a real, verified list of cities served (not an
          abstract or placeholder map graphic) */}
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

      {/* 08 · Event standby door */}
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

      {/* 09 · Audience paths */}
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

      {/* Government and institutional services (quiet band) */}
      <section className="v2-section-dense v2-hairline-top" id="government" aria-labelledby="gov-h">
        <div className="v2-container v2home-gov v2-panel">
          <div>
            <h2 id="gov-h" className="v2home-gov-h">{gov.homepage.heading}</h2>
            <p className="v2-lead v2home-gov-line">{gov.homepage.line}</p>
          </div>
          <div className="v2home-gov-btns">
            <Link to={gov.route} className="v2-btn v2-btn-secondary">{gov.homepage.viewLabel}</Link>
            <a href={gov.pdfPublicPath} download className="v2home-quiet-link">{gov.homepage.downloadLabel}</a>
          </div>
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
