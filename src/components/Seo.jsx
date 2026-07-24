import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, getRouteMeta } from '../seo/routeMeta'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeMeta(attr, key) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (el) el.remove()
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeLink(rel) {
  const el = document.head.querySelector(`link[rel="${rel}"]`)
  if (el) el.remove()
}

// Route-aware head manager. Rendered once inside the router; on every
// navigation it applies the route's title, description, canonical URL, and
// social tags from the central config in src/seo/routeMeta.js. The static
// tags in index.html act as the crawl-time fallback; this component updates
// those same tags in place, so no duplicates are created.
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = getRouteMeta(pathname)
    const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    const url = path === '/' ? `${SITE.origin}/` : `${SITE.origin}${path}`
    const image = `${SITE.origin}${SITE.ogImage}`

    document.title = meta.title
    upsertMeta('name', 'description', meta.description)

    if (meta.noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow')
      removeLink('canonical')
    } else {
      removeMeta('name', 'robots')
      upsertLink('canonical', url)
    }

    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:alt', SITE.ogImageAlt)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', image)
  }, [pathname])

  return null
}
