// Two-column media + content layout, stacking on mobile. Used for every
// "photo on one side, copy on the other" section (Crew & Operations,
// service pages, About). Pass `reverse` to alternate which side the
// media sits on between consecutive sections on the same page.
export default function MediaSplit({ media, children, reverse = false, align = 'center', className = '' }) {
  return (
    <div
      className={`v2-media-split ${reverse ? 'v2-media-split-reverse' : ''} v2-media-split-${align} ${className}`}
    >
      <div className="v2-media-split-media">{media}</div>
      <div className="v2-media-split-content">{children}</div>
    </div>
  )
}
