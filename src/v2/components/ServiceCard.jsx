import { Link } from 'react-router-dom'
import AccessibleIcon from './AccessibleIcon'

// Clickable service-summary card for the homepage index and the
// /services overview page. Always links to a real route — never a
// dead-end card.
export default function ServiceCard({ icon, title, description, href, cta = 'Learn more', className = '' }) {
  return (
    <Link to={href} className={`v2-service-card ${className}`}>
      {icon && <AccessibleIcon icon={icon} className="v2-icon-lg" size={26} />}
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="v2-service-card-cta" aria-hidden="true">{cta} &rarr;</span>
    </Link>
  )
}
