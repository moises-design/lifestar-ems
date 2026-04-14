import { useState } from 'react'
import { FaFacebook, FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'
import './Gallery.css'

const photos = [
  {
    id: 1,
    src: '/images/ambulance-1.jpg',
    label: 'Life Star EMS Fleet',
    desc: 'Our fully equipped ambulance on standby at a community event — ready for rapid response across the RGV.',
  },
  {
    id: 2,
    src: '/images/photo-2.jpg',
    label: 'On The Scene',
    desc: 'Life Star EMS crew providing professional pre-hospital care and medical transport services.',
  },
  {
    id: 3,
    src: '/images/photo-3.jpg',
    label: 'Ready To Serve',
    desc: 'Certified EMT and paramedic professionals — trained, equipped, and ready 24/7.',
  },
  {
    id: 4,
    src: null,
    label: 'Medical Equipment',
    desc: 'State-of-the-art medical equipment on every unit.',
    emoji: '🩺',
  },
  {
    id: 5,
    src: null,
    label: 'Patient Transport',
    desc: 'Safe, comfortable non-emergency transport for every patient.',
    emoji: '🏥',
  },
  {
    id: 6,
    src: null,
    label: 'Community Service',
    desc: 'Proud to serve our Rio Grande Valley community every day.',
    emoji: '🤝',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const prev = () => setLightbox(i => (i === 0 ? photos.length - 1 : i - 1))
  const next = () => setLightbox(i => (i === photos.length - 1 ? 0 : i + 1))

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="gallery-header">
          <div>
            <span className="section-label">Our Team &amp; Fleet</span>
            <h2 className="section-title">
              See Us<br /><em>In Action</em>
            </h2>
          </div>
          <a href="https://www.facebook.com/LifeStarEMSRGV/" target="_blank" rel="noreferrer" className="gallery-fb-btn">
            <FaFacebook /> More Photos on Facebook
          </a>
        </div>

        <div className="gallery-grid">
          {photos.map((photo, idx) => (
            <button key={photo.id} className="gallery-card" onClick={() => setLightbox(idx)} aria-label={`View ${photo.label}`}>
              {photo.src ? (
                <img src={photo.src} alt={photo.label} loading="lazy" />
              ) : (
                <div className="gallery-placeholder">
                  <span className="gp-emoji">{photo.emoji}</span>
                  <span className="gp-hint">Add photo here</span>
                </div>
              )}
              <div className="gallery-overlay">
                <FaExpand className="expand-icon" />
                <span className="gallery-card-label">{photo.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLightbox(null)}><FaTimes /></button>
            <button className="lb-prev" onClick={prev}><FaChevronLeft /></button>
            <button className="lb-next" onClick={next}><FaChevronRight /></button>
            <div className="lb-media">
              {photos[lightbox].src
                ? <img src={photos[lightbox].src} alt={photos[lightbox].label} />
                : <div className="lb-placeholder"><span>{photos[lightbox].emoji}</span><p>{photos[lightbox].label}</p></div>
              }
            </div>
            <div className="lb-info">
              <strong>{photos[lightbox].label}</strong>
              <p>{photos[lightbox].desc}</p>
              <span>{lightbox + 1} / {photos.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
