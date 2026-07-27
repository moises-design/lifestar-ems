// Every route registered in App.jsx must have a routeMeta.js entry (the
// exact gap that used to leave new routes silently falling back to
// NOT_FOUND_META — see docs/COMPLETE-EXPERIENCE-AUDIT.md §11), and every
// entry must have a real title/description within reasonable SEO length
// bounds.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { routeMeta, SITE } from '../../src/seo/routeMeta.js'

const APP_JSX = readFileSync(join(import.meta.dirname, '..', '..', 'src', 'App.jsx'), 'utf8')

function registeredRoutes() {
  const matches = [...APP_JSX.matchAll(/<Route path="([^"]+)"/g)]
  return matches.map(m => m[1]).filter(p => p !== '*')
}

describe('routeMeta completeness', () => {
  const routes = registeredRoutes()

  it('found at least the known route count (sanity check on the regex above)', () => {
    expect(routes.length).toBeGreaterThanOrEqual(14)
  })

  for (const route of registeredRoutes()) {
    it(`${route} has a routeMeta entry`, () => {
      expect(routeMeta[route], `Missing routeMeta['${route}']`).toBeDefined()
    })
  }

  it('every routeMeta entry has a non-empty title and description', () => {
    for (const [path, meta] of Object.entries(routeMeta)) {
      expect(meta.title, `${path} title`).toBeTruthy()
      expect(meta.description, `${path} description`).toBeTruthy()
    }
  })

  it('titles stay under 70 characters (search-result truncation)', () => {
    const long = Object.entries(routeMeta).filter(([, m]) => m.title.length > 70)
    expect(long.map(([p]) => p)).toEqual([])
  })

  it('descriptions stay under 165 characters (search-result truncation)', () => {
    const long = Object.entries(routeMeta).filter(([, m]) => m.description.length > 165)
    expect(long.map(([p]) => p)).toEqual([])
  })

  it('SITE.origin is the real production domain', () => {
    expect(SITE.origin).toBe('https://www.lifestaremsrgv.com')
  })
})
