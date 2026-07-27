import { Link } from 'react-router-dom'

// The site's one compact, contained "night" accent card, as a reusable
// component. Never render this full-bleed — it stays a contained card
// inside an otherwise light section (see docs/THEME-CONSISTENCY-AUDIT.md).
export default function CTASection({ eyebrow, title, lead, primaryCta, secondaryCta, phone, className = '' }) {
  return (
    <div className={`v2-cta-card v2-night ${className}`}>
      {eyebrow && <span className="v2-label">{eyebrow}</span>}
      <h2>{title}</h2>
      {lead && <p className="v2-lead">{lead}</p>}
      <div className="v2-cta-actions">
        {primaryCta && (
          <Link to={primaryCta.href} className="v2-btn v2-btn-primary">{primaryCta.label}</Link>
        )}
        {secondaryCta && (
          <Link to={secondaryCta.href} className="v2-btn v2-btn-secondary">{secondaryCta.label}</Link>
        )}
        {phone && (
          <a href={phone.href} className="v2-cta-phone">{phone.label}</a>
        )}
      </div>
    </div>
  )
}
