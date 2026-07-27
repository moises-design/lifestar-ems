// Shared route list for the e2e suite (smoke + accessibility specs).
// Lives outside both spec files because Playwright test files may not
// import one another directly.
export const ROUTES = [
  '/', '/services', '/services/dialysis', '/services/therapy',
  '/services/pediatrics', '/services/events', '/services/long-distance',
  '/request', '/about', '/coverage', '/contact',
  '/government-contracting', '/privacy', '/sitemap',
]
