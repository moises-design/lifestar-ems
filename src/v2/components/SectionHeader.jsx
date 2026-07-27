// Shared section intro: label + heading + optional lead paragraph.
// Replaces per-page hardcoded <h2 className="title">Text<br /><em>...</em></h2>
// patterns with one CSS-driven wrap (see .v2-section-head heading rules)
// so headings no longer force the same line break at every viewport.
export default function SectionHeader({ label, title, lead, align = 'left', tag = 'h2', className = '' }) {
  const Heading = tag
  return (
    <div className={`v2-section-head v2-section-head-${align} ${className}`}>
      {label && <span className="v2-label">{label}</span>}
      <Heading>{title}</Heading>
      {lead && <p className="v2-lead">{lead}</p>}
    </div>
  )
}
