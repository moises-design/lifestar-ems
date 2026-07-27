// A single labeled phone contact block. Always pass an explicit `kind`
// ("dispatch" or "contracting") so dispatch (956-660-6543) and
// contracting/administrative (956-309-3052) numbers stay visibly
// differentiated everywhere they appear, per the site's safeguards.
export default function ContactCard({ kind, title, phoneDisplay, phoneHref, description, className = '' }) {
  return (
    <div className={`v2-contact-card v2-contact-card-${kind} ${className}`}>
      <span className="v2-label">{title}</span>
      <a href={phoneHref} className="v2-contact-card-phone">{phoneDisplay}</a>
      {description && <p className="v2-small">{description}</p>}
    </div>
  )
}
