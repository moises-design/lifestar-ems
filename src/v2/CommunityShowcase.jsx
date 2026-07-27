import { useState } from 'react'
import { content } from './content'
import { hasCuratedPosts, featuredPost, supportingPosts } from './content/facebookPosts'
import './CommunityShowcase.css'

const { brand, home } = content
const fb = home.facebook

const TIMELINE_SRC =
  'https://www.facebook.com/plugins/page.php?href=' +
  encodeURIComponent(brand.facebookUrl) +
  '&tabs=timeline&width=500&height=680&small_header=true' +
  '&adapt_container_width=true&hide_cover=true&show_facepile=false'

const videoEmbedSrc = url =>
  'https://www.facebook.com/plugins/video.php?href=' +
  encodeURIComponent(url) +
  '&show_text=false&autoplay=false&width=740'

function fmtDate(iso) {
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US',
      { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return iso
  }
}

function MediaBadge({ type }) {
  return (
    <span className="v2cs-badge">
      {type === 'video' ? fb.videoBadge : fb.photoBadge}
    </span>
  )
}

function PostMedia({ post, featured = false }) {
  const [playing, setPlaying] = useState(false)

  if (post.mediaType === 'video' && playing) {
    return (
      <div className="v2cs-media v2cs-media-video">
        <iframe
          src={videoEmbedSrc(post.videoUrl)}
          title={post.alt || fb.videoBadge}
          style={{ border: 'none', overflow: 'hidden' }}
          allow="encrypted-media"
          allowFullScreen
          className="v2cs-video-frame"
        />
      </div>
    )
  }

  return (
    <div className="v2cs-media">
      <img
        src={post.image}
        alt={post.alt || ''}
        width={post.width}
        height={post.height}
        loading={featured ? 'eager' : 'lazy'}
        decoding="async"
      />
      {post.mediaType === 'video' && (
        <button
          type="button"
          className="v2cs-play"
          aria-label={`${fb.playLabel}: ${post.alt || post.caption || ''}`}
          onClick={() => setPlaying(true)}
        >
          <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true">
            <path d="M2 2.5v21l18-10.5z" fill="currentColor" />
          </svg>
        </button>
      )}
    </div>
  )
}

function CuratedShowcase() {
  const feat = featuredPost()
  const rest = supportingPosts(6)
  return (
    <div className="v2cs-grid">
      {feat && (
        <article className="v2cs-card v2cs-featured">
          <PostMedia post={feat} featured />
          <div className="v2cs-card-body">
            <p className="v2cs-meta">
              <MediaBadge type={feat.mediaType} />
              <time dateTime={feat.date}>{fmtDate(feat.date)}</time>
            </p>
            {feat.caption && <p className="v2cs-caption">{feat.caption}</p>}
            <a href={feat.postUrl} target="_blank" rel="noreferrer" className="v2cs-postlink">
              {fb.openPostLabel}
            </a>
          </div>
        </article>
      )}
      <div className="v2cs-rail" role="list">
        {rest.map(post => (
          <article key={post.postUrl} className="v2cs-card" role="listitem">
            <PostMedia post={post} />
            <div className="v2cs-card-body">
              <p className="v2cs-meta">
                <MediaBadge type={post.mediaType} />
                <time dateTime={post.date}>{fmtDate(post.date)}</time>
              </p>
              {post.caption && <p className="v2cs-caption v2cs-caption-s">{post.caption}</p>}
              <a href={post.postUrl} target="_blank" rel="noreferrer" className="v2cs-postlink">
                {fb.openPostLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

// Fallback until curated posts are approved. Rather than auto-loading the
// Facebook iframe (which can render blank under restricted networks, and
// otherwise makes the section iframe-dependent to show anything at all),
// this shows an honest quiet state by default: real copy and a working
// outbound link, no embed. The live timeline is opt-in, behind an explicit
// button click, so a visitor who wants it can still see it.
function CommunityQuiet({ onShowTimeline }) {
  return (
    <div className="v2cs-quiet v2-panel">
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="v2cs-quiet-icon">
        <path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.27-.12-2.4-.12-2.37 0-4 1.44-4 4.1v2.32H7.6V13h2.7v8h3.2Z"/>
      </svg>
      <p className="v2cs-quiet-text">{fb.followLabel}</p>
      <div className="v2cs-quiet-actions">
        <a href={brand.facebookUrl} target="_blank" rel="noreferrer" className="v2-btn v2-btn-primary">
          {fb.openPageLabel}
        </a>
        <button type="button" className="v2-btn v2-btn-secondary" onClick={onShowTimeline}>
          {fb.showTimelineLabel}
        </button>
      </div>
    </div>
  )
}

// Opt-in live page timeline: only requested (and only loads the Facebook
// iframe) after the visitor explicitly clicks through from CommunityQuiet.
function LiveTimeline() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="v2cs-live">
      <figure className="v2cs-live-frame v2-panel">
        <div className="v2cs-live-stage">
          {!loaded && (
            <div className="v2cs-live-wait">
              <img src="/icon-192.png" alt="" aria-hidden="true" />
              <p className="v2-small v2cs-live-loading">{fb.loadingLabel}</p>
            </div>
          )}
          <iframe
            src={TIMELINE_SRC}
            title={fb.liveRegionLabel}
            className={`v2cs-live-iframe ${loaded ? 'is-loaded' : ''}`}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            allow="encrypted-media"
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <figcaption className="v2cs-live-caption">{fb.liveCaption}</figcaption>
      </figure>
      <a href={brand.facebookUrl} target="_blank" rel="noreferrer" className="v2-btn v2-btn-secondary v2cs-live-open">
        {fb.openPageLabel}
      </a>
    </div>
  )
}

export default function CommunityShowcase() {
  const [showTimeline, setShowTimeline] = useState(false)
  return (
    <section className="v2-section v2-hairline-top" id={fb.id} aria-labelledby="fb-h">
      <div className="v2-container">
        <div className="v2-section-head v2cs-head">
          <span className="v2-label">{fb.label}</span>
          <h2 id="fb-h">{fb.heading}</h2>
          <p className="v2-lead">{fb.line}</p>
        </div>
        {hasCuratedPosts ? (
          <CuratedShowcase />
        ) : showTimeline ? (
          <LiveTimeline />
        ) : (
          <CommunityQuiet onShowTimeline={() => setShowTimeline(true)} />
        )}
      </div>
    </section>
  )
}
