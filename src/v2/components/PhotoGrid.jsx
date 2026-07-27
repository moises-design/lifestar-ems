import Picture from '../Picture'

// A grid of real photography with honest captions. Never used to fill a
// slot with a placeholder — every item must be a real image path.
export default function PhotoGrid({ photos, columns = 3, className = '' }) {
  return (
    <div className={`v2-photo-grid v2-photo-grid-${columns} ${className}`}>
      {photos.map((photo) => (
        <figure key={photo.src} className="v2-photo-grid-item">
          <Picture {...photo} className="v2-photo-grid-img" />
          {photo.caption && <figcaption>{photo.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}
