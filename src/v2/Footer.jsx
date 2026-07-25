import { Link } from 'react-router-dom'
import { content } from './content'
import './Footer.css'

const { brand, nav, footer, emergencyNotice } = content

export default function FooterV2() {
  return (
    <div className="v2">
      <footer className="v2f v2-night" role="contentinfo">
        <div className="v2-container v2f-grid">
          <div className="v2f-brand-col">
            <Link to="/" className="v2f-brand">
              <img src="/icon-192.png" alt="" aria-hidden="true" />
              <span>{brand.name}</span>
            </Link>
            <p className="v2f-desc">{footer.description}</p>
            <Link to={nav.requestCta.href} className="v2-btn v2-btn-primary v2f-cta">
              {nav.requestCta.label}
            </Link>
          </div>

          <nav className="v2f-col" aria-label="Footer services">
            <h4 className="v2f-title">{footer.servicesTitle}</h4>
            <ul>
              {nav.serviceLinks.map(s => (
                <li key={s.href}><Link to={s.href}>{s.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="v2f-col" aria-label="Footer company">
            <h4 className="v2f-title">{footer.companyTitle}</h4>
            <ul>
              {footer.companyLinks.map(l => (
                <li key={l.href}><Link to={l.href}>{l.label}</Link></li>
              ))}
              <li><a href="/sitemap.xml">{footer.sitemapLabel}</a></li>
              {/* Placeholder slot: becomes a real link when the privacy page ships */}
              <li className="v2f-muted">{footer.privacyLabel}</li>
              <li>
                <a href={brand.facebookUrl} target="_blank" rel="noreferrer">
                  {footer.facebookLabel}
                </a>
              </li>
            </ul>
          </nav>

          <div className="v2f-col">
            <h4 className="v2f-title">{footer.contactTitle}</h4>
            <ul>
              <li><a href={brand.phoneHref} className="v2f-phone">{brand.phoneDisplay}</a></li>
              <li className="v2f-muted">{footer.regionLine}</li>
            </ul>
          </div>
        </div>

        <div className="v2-container v2f-bottom">
          <p className="v2f-notice">{emergencyNotice}</p>
          <p className="v2f-legal">
            © {new Date().getFullYear()} {brand.name} · {brand.region}. {footer.rights}
          </p>
        </div>
      </footer>
    </div>
  )
}
