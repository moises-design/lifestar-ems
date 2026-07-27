// Post-build step: writes a static, correctly-headed HTML file for every
// known public route, plus a real dist/404.html, so a crawler or social
// unfurler that does not execute JavaScript sees the right title,
// description, canonical, and OG/Twitter tags for the page it actually
// requested — not just whatever is baked into the homepage's index.html.
//
// This does not add server-side rendering: every generated file is the
// same client shell (same hashed JS/CSS bundle) with only the <head>
// metadata swapped in. The React app still boots and renders normally;
// src/components/Seo.jsx keeps updating the same tags in place on
// client-side navigation, so nothing here conflicts with it.
//
// Paired with vercel.json's "cleanUrls": true and the removal of the
// previous catch-all rewrite: a request for a known route now resolves
// directly to its own static file (200, correct head), and a request for
// a genuinely unknown path has no matching static file, so Vercel falls
// through to this dist/404.html with a real HTTP 404 status.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { routeMeta, NOT_FOUND_META, SITE } from '../src/seo/routeMeta.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderHead(template, path, meta) {
  const url = `${SITE.origin}${path === '/' ? '/' : path}`
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  let html = template

  html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${description}" />`,
  )
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${title}" />`,
  )
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${description}" />`,
  )
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${url}" />`,
  )
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${title}" />`,
  )
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${description}" />`,
  )

  // Canonical link + robots: inserted once, right after <meta name="viewport">.
  const extraTags = meta.noindex
    ? `<meta name="robots" content="noindex, nofollow" />`
    : `<link rel="canonical" href="${url}" />`
  html = html.replace(
    /(<meta name="viewport"[^>]*\/>)/,
    `$1\n    ${extraTags}`,
  )

  return html
}

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8')

  const routes = Object.keys(routeMeta).filter(p => p !== '/')
  for (const path of routes) {
    const meta = routeMeta[path]
    const html = renderHead(template, path, meta)
    const outPath = join(DIST, `${path.replace(/^\//, '')}.html`)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html)
  }

  // Root: rewrite dist/index.html in place with the same head-injection
  // pass, so it stays byte-consistent with every other generated file
  // (today it already matches; this keeps it that way if routeMeta['/']
  // ever changes without someone remembering to touch index.html by hand).
  const rootHtml = renderHead(template, '/', routeMeta['/'])
  await writeFile(join(DIST, 'index.html'), rootHtml)

  // Real 404 page: same shell, noindex metadata, actual HTTP 404 status
  // (served automatically by Vercel for any unmatched path once the
  // blanket SPA rewrite is removed from vercel.json).
  const notFoundHtml = renderHead(template, '/404', NOT_FOUND_META)
  await writeFile(join(DIST, '404.html'), notFoundHtml)

  console.log(`Prerendered ${routes.length} route(s) + dist/404.html`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
