import { useState } from 'react'
import { content } from './content'
import './FacebookFeed.css'

const { brand, home } = content
const fb = home.facebook

// Privacy-conscious Facebook feed: nothing loads from Facebook until the
// visitor chooses to view it (click-to-load facade around the official
// Page Plugin iframe; no Facebook SDK script is ever added).
const PLUGIN_SRC =
  'https://www.facebook.com/plugins/page.php?href=' +
  encodeURIComponent(brand.facebookUrl) +
  '&tabs=timeline&width=500&height=640&small_header=true' +
  '&adapt_container_width=true&hide_cover=false&show_facepile=false'

export default function FacebookFeed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="v2fb v2-panel">
      {loaded ? (
        <iframe
          src={PLUGIN_SRC}
          title={fb.iframeTitle}
          className="v2fb-frame"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          allow="encrypted-media"
          loading="lazy"
        />
      ) : (
        <div className="v2fb-facade">
          <p className="v2fb-name">{brand.facebookLabel}</p>
          <p className="v2fb-note v2-small">{fb.privacyNote}</p>
          <div className="v2fb-actions">
            <button type="button" className="v2-btn v2-btn-primary" onClick={() => setLoaded(true)}>
              {fb.loadLabel}
            </button>
            <a href={brand.facebookUrl} target="_blank" rel="noreferrer" className="v2-btn v2-btn-secondary">
              {fb.openLabel}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
