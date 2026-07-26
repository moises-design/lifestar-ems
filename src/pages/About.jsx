import { Link } from 'react-router-dom'
import InnerPage from '../v2/InnerPage'
import Picture from '../v2/Picture'
import { content } from '../v2/content'
import { SITE } from '../seo/routeMeta'
import './About.css'

const { brand, nav, pages } = content
const about = pages.about

// ---------- structured data (page-scoped, verified facts only) ----------
const ORIGIN = SITE.origin
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${ORIGIN}/about#heather-ayala-segovia`,
      name: about.leadership.name,
      jobTitle: 'CEO',
      worksFor: { '@id': `${ORIGIN}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${ORIGIN}/about` },
      ],
    },
  ],
}

export default function About() {
  return (
    <InnerPage
      {...about}
      breadcrumb={[{ label: 'About' }]}
      cta={
        <>
          <Link to={nav.requestCta.href} className="v2-btn v2-btn-primary">{nav.requestCta.label}</Link>
          <a href={brand.phoneHref} className="v2-btn v2-btn-secondary">{nav.callLabel} {brand.phoneDisplay}</a>
        </>
      }
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Company story */}
      <section className="v2-section v2-hairline-top" aria-labelledby="about-story-h">
        <div className="v2-container v2about-split">
          <div>
            <h2 id="about-story-h" className="about-h2">{about.story.heading}</h2>
            <p className="v2-lead">{about.story.body}</p>
          </div>
          <div className="about-photo-frame v2-panel">
            <Picture
              src="/images/optimized/ambulance-1.jpg"
              webp="/images/optimized/ambulance-1.webp"
              alt="A Life Star EMS ambulance in the field."
              width={1050}
              height={1400}
              loading="lazy"
              className="about-photo"
            />
          </div>
        </div>
      </section>

      {/* Leadership profile */}
      <section className="v2-section v2-hairline-top" aria-labelledby="about-lead-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <h2 id="about-lead-h" className="about-h2">{about.leadership.heading}</h2>
          </div>
          <div className="about-exec">
            <div className="about-exec-photo-frame v2-panel">
              <Picture
                src="/images/company/optimized/heather-ayala-segovia-standing.jpg"
                webp="/images/company/optimized/heather-ayala-segovia-standing.webp"
                alt="Heather Ayala-Segovia, CEO of Life Star EMS, standing portrait."
                width={1100}
                height={1375}
                loading="lazy"
                className="about-exec-photo"
              />
            </div>
            <div className="about-exec-body">
              <p className="about-exec-name">{about.leadership.name}</p>
              <p className="about-exec-title v2-small">{about.leadership.title}</p>
              <p className="v2-lead about-exec-bio">{about.leadership.bio}</p>
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  )
}
