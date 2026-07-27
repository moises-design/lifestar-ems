import { Link } from 'react-router-dom'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import { gov } from '../v2/content/government'
import './Sitemap.css'

const sections = [
  {
    heading: 'Services',
    links: [
      { label: 'All services', href: '/services' },
      { label: 'Dialysis transportation', href: '/services/dialysis' },
      { label: 'Pediatric therapy transportation', href: '/services/therapy' },
      { label: 'Pediatric transportation', href: '/services/pediatrics' },
      { label: 'Event EMS standby', href: '/services/events' },
      { label: 'Long-distance medical transport', href: '/services/long-distance' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Coverage area', href: '/coverage' },
      { label: gov.navLabel, href: gov.route },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Get started',
    links: [
      { label: 'Request transport', href: '/request' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy notice', href: '/privacy' },
    ],
  },
]

export default function Sitemap() {
  return (
    <InnerPage
      label="Site map"
      title="Sitemap"
      lead="Every page on lifestaremsrgv.com, in one place."
      breadcrumb={[{ label: 'Sitemap' }]}
    >
      <div className="v2-container v2-section">
        <div className="sitemap-grid">
          {sections.map(section => (
            <nav key={section.heading} aria-label={section.heading}>
              <h2>{section.heading}</h2>
              <ul>
                {section.links.map(l => (
                  <li key={l.href}><Link to={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="sitemap-notice">{content.emergencyNotice}</p>
      </div>
    </InnerPage>
  )
}
