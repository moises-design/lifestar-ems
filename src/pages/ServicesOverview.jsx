import { Link } from 'react-router-dom'
import { FaWheelchair, FaChild, FaBriefcaseMedical, FaRoute, FaHandsHelping, FaCheckCircle } from 'react-icons/fa'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import { ServiceCard, SectionHeader, CTASection } from '../v2/components'
import './ServicesOverview.css'

const serviceIcons = {
  '/services/dialysis': FaWheelchair,
  '/services/therapy': FaHandsHelping,
  '/services/pediatrics': FaChild,
  '/services/events': FaBriefcaseMedical,
  '/services/long-distance': FaRoute,
}

export default function ServicesOverview() {
  const { services, paths } = content.home
  const { pages } = content

  return (
    <InnerPage
      {...pages.services}
      breadcrumb={[{ label: 'Services' }]}
      cta={
        <>
          <Link to="/request" className="v2-btn v2-btn-primary">Request Transport</Link>
          <a href="tel:+19566606543" className="v2-btn v2-btn-secondary">Call dispatch (956) 660-6543</a>
        </>
      }
    >
      <div className="v2-container v2-section">
        <SectionHeader label="What we offer" title="Five services, one standard of care" />
        <div className="services-ov-grid">
          {services.items.map(item => (
            <ServiceCard
              key={item.href}
              icon={serviceIcons[item.href]}
              title={item.title}
              description={item.line}
              href={item.href}
              cta={services.linkLabel}
            />
          ))}
        </div>
      </div>

      <div className="v2-container v2-section-dense v2-hairline-top">
        <SectionHeader label="Capabilities" title="What Life Star EMS provides" />
        <ul className="services-ov-capabilities">
          {pages.services.capabilities.map(item => (
            <li key={item}><FaCheckCircle aria-hidden="true" />{item}</li>
          ))}
        </ul>
      </div>

      <div className="v2-container v2-section-dense v2-hairline-top">
        <SectionHeader label={paths.label} title={paths.heading} />
        <div className="services-ov-paths">
          {paths.items.map(p => (
            <div key={p.href} className="services-ov-path-card">
              <h3>{p.title}</h3>
              <p>{p.line}</p>
              <Link to={p.href}>{p.linkLabel} &rarr;</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="v2-container v2-section-dense">
        <CTASection
          eyebrow="Ready when you are"
          title={pages.services.ctaHeading}
          lead={pages.services.ctaLine}
          primaryCta={{ label: 'Request Transport', href: '/request' }}
          secondaryCta={{ label: 'Contact us', href: '/contact' }}
          phone={{ label: 'Call dispatch (956) 660-6543', href: 'tel:+19566606543' }}
        />
      </div>
    </InnerPage>
  )
}
