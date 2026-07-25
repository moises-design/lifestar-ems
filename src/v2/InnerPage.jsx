import { Link } from 'react-router-dom'
import './InnerPage.css'

// Reusable V2 inner-page wrapper. Renders the editorial page intro
// (breadcrumb, section label, the route's single h1, lead, optional CTA
// and media slot) on V2 paper, then hosts the page body below. Legacy V1
// content is passed as children with legacy={true} so it keeps its own
// dark styling inside a contained band until the full page redesign.
export default function InnerPage({
  label,
  title,
  lead,
  cta = null,
  media = null,
  breadcrumb = null,
  legacy = false,
  children,
}) {
  return (
    <>
      <div className="v2 v2page-intro-wrap">
        <div className="v2-container v2page-intro">
          {breadcrumb && (
            <nav className="v2page-crumbs v2-small" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {breadcrumb.map(c => (
                <span key={c.label}>
                  <span aria-hidden="true" className="v2page-crumb-sep">/</span>
                  {c.href ? <Link to={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </span>
              ))}
            </nav>
          )}
          {label && <span className="v2-label">{label}</span>}
          <h1 className="v2page-h1">{title}</h1>
          {lead && <p className="v2-lead v2page-lead">{lead}</p>}
          {cta && <div className="v2page-cta">{cta}</div>}
          {media && <div className="v2page-media">{media}</div>}
        </div>
      </div>
      {legacy ? <div className="v2page-legacy">{children}</div> : <div className="v2">{children}</div>}
    </>
  )
}
