// Central SEO configuration. Every public route's title, description, and
// canonical path lives here so metadata is defined in exactly one place.
// Facts policy: only verified facts appear in metadata. Verified dispatch
// number: (956) 660-6543. No ratings, insurance, licensing, hours, or
// emergency-service claims are made here (see docs/SEO-FACT-VERIFICATION.md).

export const SITE = {
  origin: 'https://www.lifestaremsrgv.com',
  name: 'Life Star EMS',
  ogImage: '/images/og-image.png',
  ogImageAlt: 'Life Star EMS logo with the text Non-Emergency Medical Transportation in the Rio Grande Valley',
}

const routeMeta = {
  '/': {
    title: 'Non-Emergency Medical Transportation in the RGV | Life Star EMS',
    description:
      'Life Star EMS provides scheduled non-emergency medical transportation and event EMS standby services across the Rio Grande Valley. Call (956) 660-6543.',
  },
  '/services/dialysis': {
    title: 'Dialysis Transportation in the Rio Grande Valley | Life Star EMS',
    description:
      'Scheduled dialysis transportation to and from treatment centers across the Rio Grande Valley. Call Life Star EMS at (956) 660-6543 to set up your rides.',
  },
  '/services/therapy': {
    title: 'Therapy Transportation in the Rio Grande Valley | Life Star EMS',
    description:
      'Transportation for children attending physical, occupational, and speech therapy appointments in the Rio Grande Valley. Call (956) 660-6543 to schedule.',
  },
  '/services/pediatrics': {
    title: 'Pediatric Medical Transportation in the RGV | Life Star EMS',
    description:
      'Non-emergency pediatric transportation in the Rio Grande Valley, with long-distance trips across Texas coordinated with families and medical providers.',
  },
  '/services/events': {
    title: 'EMS Standby Services for Events in South Texas | Life Star EMS',
    description:
      'On-site EMS standby coverage for school sports, tournaments, concerts, and community events in the Rio Grande Valley. Call (956) 660-6543 for a quote.',
  },
  '/services/long-distance': {
    title: 'Long-Distance Medical Transport Across Texas | Life Star EMS',
    description:
      'Safe, monitored long-distance medical transport across Texas with BLS-certified crews. Life Star EMS coordinates trips to Houston, San Antonio, Dallas, and beyond. Call (956) 660-6543.',
  },
  '/request': {
    title: 'Request Medical Transportation | Life Star EMS',
    description:
      'Request scheduled non-emergency medical transportation or event EMS standby from Life Star EMS. Submit the online form or call (956) 660-6543.',
  },
  '/coverage': {
    title: 'Life Star EMS Service Area in the Rio Grande Valley',
    description:
      'Life Star EMS serves Edinburg, McAllen, Mission, Pharr, Weslaco, Harlingen, Brownsville, and nearby Rio Grande Valley communities. Call (956) 660-6543.',
  },
  '/government-contracting': {
    title: 'Government Contracting | Life Star EMS',
    description:
      'Life Star EMS Inc. provides ambulance transportation, event EMS standby, and disaster response support for agencies, school districts, universities, and primes.',
  },
  '/about': {
    title: 'About Life Star EMS | Family-Owned EMS in the Rio Grande Valley',
    description:
      'Life Star EMS Inc. is a family-owned, woman-owned ambulance and medical transportation company serving the Rio Grande Valley since 2009, led by CEO Heather Ayala-Segovia.',
  },
  '/contact': {
    title: 'Contact Life Star EMS | Medical Transportation in the RGV',
    description:
      'Contact Life Star EMS in Edinburg, Texas for scheduled medical transportation in the Rio Grande Valley. Call (956) 660-6543 or send a message online.',
  },
}

export const NOT_FOUND_META = {
  title: 'Page Not Found | Life Star EMS',
  description: 'The page you are looking for does not exist. Return to the Life Star EMS homepage or contact us for help.',
  noindex: true,
}

// Returns the metadata for a path, or the noindex 404 metadata for any
// path that is not a known public route.
export function getRouteMeta(pathname) {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  return routeMeta[path] || NOT_FOUND_META
}
