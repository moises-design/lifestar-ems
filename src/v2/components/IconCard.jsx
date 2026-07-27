import AccessibleIcon from './AccessibleIcon'

// A card with an icon, heading, and short body text — the shared
// replacement for every page's hand-rolled "feature card" pattern
// (dialysis punctuality cards, therapy-type cards, event-type cards).
export default function IconCard({ icon, title, children, className = '', tone = 'default' }) {
  return (
    <div className={`v2-icon-card ${className}`}>
      {icon && <AccessibleIcon icon={icon} tone={tone} className="v2-icon-lg" size={26} />}
      <h3>{title}</h3>
      {children && <p>{children}</p>}
    </div>
  )
}
