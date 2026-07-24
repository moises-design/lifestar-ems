// ============================================================
// Life Star EMS V2 content — English.
// All public-facing V2 copy lives here (never hardcoded in
// components) so a Spanish locale can be added later as es.js
// with the same shape. Facts policy: verified facts only.
// No em dashes in any string.
// ============================================================

export const en = {
  brand: {
    name: 'Life Star EMS',
    region: 'Rio Grande Valley, Texas',
    phoneDisplay: '(956) 660-6543',
    phoneHref: 'tel:9566606543',
    facebookUrl: 'https://www.facebook.com/LifeStarEMSRGV/',
    facebookLabel: 'Life Star EMS on Facebook',
  },

  emergencyNotice:
    'For a medical emergency, call 911. Life Star EMS provides scheduled transportation and event standby services.',

  nav: {
    services: 'Services',
    serviceLinks: [
      { label: 'Dialysis transportation', href: '/services/dialysis' },
      { label: 'Pediatric therapy transportation', href: '/services/therapy' },
      { label: 'Pediatric and long-distance transportation', href: '/services/pediatrics' },
      { label: 'Event EMS standby', href: '/services/events' },
    ],
    coverage: { label: 'Coverage', href: '/coverage' },
    why: { label: 'Why Life Star', href: '/#why-life-star' },
    contact: { label: 'Contact', href: '/contact' },
    requestCta: { label: 'Request Transport', href: '/request' },
    callLabel: 'Call dispatch',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },

  home: {
    hero: {
      eyebrow: 'Scheduled medical transportation',
      // The homepage's single h1. Refined in Mission 3; keep one h1 only.
      heading: 'Getting you to care, calmly and on time.',
      lead:
        'Life Star EMS provides scheduled non-emergency medical transportation and event standby coverage for families, facilities, and schools across the Rio Grande Valley.',
      local: 'Locally owned and operated in Edinburg, Texas',
    },

    services: {
      id: 'services',
      label: '01 · What we do',
      heading: 'Four services, one standard of care',
      items: [
        {
          num: '01',
          title: 'Dialysis transportation',
          line: 'Scheduled rides to and from treatment, built around your center’s calendar.',
          href: '/services/dialysis',
        },
        {
          num: '02',
          title: 'Pediatric therapy transportation',
          line: 'Dependable transport for children attending physical, occupational, and speech therapy.',
          href: '/services/therapy',
        },
        {
          num: '03',
          title: 'Pediatric and long-distance transportation',
          line: 'Coordinated trips across Texas, planned with families and providers.',
          href: '/services/pediatrics',
        },
        {
          num: '04',
          title: 'Event EMS standby',
          line: 'On-site medical standby for school sports, tournaments, concerts, and community events.',
          href: '/services/events',
        },
      ],
      linkLabel: 'Learn more',
    },

    how: {
      id: 'how-it-works',
      label: '02 · How it works',
      heading: 'Scheduling a ride is simple',
      steps: [
        { num: '1', title: 'Call or request online', line: 'Tell us who is riding, where, and when.' },
        { num: '2', title: 'We confirm the details', line: 'Our team reviews your request and confirms your schedule with you.' },
        { num: '3', title: 'Your ride is scheduled', line: 'We plan the route and arrive ready for your appointment.' },
      ],
    },

    why: {
      id: 'why-life-star',
      label: '03 · Why Life Star',
      heading: 'Care in every mile',
      line:
        'We are a local team serving Valley families, clinics, and schools with scheduled transportation that treats every rider with dignity.',
    },

    operations: {
      id: 'operations',
      label: '04 · Crew and operations',
      heading: 'Who shows up when you call',
      line: 'The people behind every ride, and the preparation that goes into each trip.',
    },

    coverage: {
      id: 'coverage',
      label: '05 · Where we serve',
      heading: 'Across the Rio Grande Valley',
      line:
        'Edinburg, McAllen, Mission, Pharr, San Juan, Alamo, Donna, Weslaco, Mercedes, Harlingen, Los Fresnos, Brownsville, and Rio Grande City, with long-distance trips across Texas.',
      linkLabel: 'See our full service area',
      href: '/coverage',
    },

    events: {
      id: 'events',
      label: '06 · Event standby',
      heading: 'Medical coverage for your next event',
      line:
        'From school sports to community festivals, our crews provide on-site EMS standby across the Valley.',
      linkLabel: 'Request event coverage',
      href: '/services/events',
    },

    paths: {
      id: 'paths',
      label: '07 · How can we help',
      heading: 'Start where you are',
      items: [
        { title: 'For families', line: 'Schedule recurring or one-time rides for someone you love.', href: '/request', linkLabel: 'Request a ride' },
        { title: 'For facilities and case managers', line: 'Coordinate dependable transport for your patients.', href: '/contact', linkLabel: 'Talk to our team' },
        { title: 'For schools and event organizers', line: 'Arrange EMS standby for games, meets, and events.', href: '/services/events', linkLabel: 'Plan event coverage' },
      ],
    },

    facebook: {
      id: 'community',
      label: '08 · Community',
      heading: 'Life Star in the Community',
      line:
        'See recent transports, event standby coverage, crew activity, and community involvement from Life Star EMS.',
      followLabel: 'Follow Life Star EMS',
      openPostLabel: 'View on Facebook',
      liveRegionLabel: 'Recent posts from the Life Star EMS Facebook page',
      liveCaption: 'Live from our Facebook page',
      playLabel: 'Play video',
      photoBadge: 'Photo',
      videoBadge: 'Video',
      featuredBadge: 'Featured',
    },

    faq: {
      id: 'faq',
      label: '09 · Common questions',
      heading: 'Good to know before you call',
      items: [
        {
          q: 'Is Life Star EMS an emergency service?',
          a: 'No. For a medical emergency, call 911. Life Star EMS provides scheduled non-emergency transportation and event standby services.',
        },
        {
          q: 'How do I request a ride?',
          a: 'Call dispatch at (956) 660-6543 or use the request form on this site. We confirm every request with you before the ride.',
        },
        {
          q: 'What areas do you serve?',
          a: 'We serve communities across the Rio Grande Valley, including Edinburg, McAllen, Mission, Pharr, Weslaco, Harlingen, and Brownsville, with long-distance trips across Texas.',
        },
      ],
    },

    cta: {
      id: 'schedule',
      heading: 'Ready to schedule a ride?',
      line: 'Send a request online or call our dispatch team.',
      requestLabel: 'Request Transport',
    },
  },

  footer: {
    description:
      'Scheduled non-emergency medical transportation and event EMS standby services across the Rio Grande Valley.',
    servicesTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    companyLinks: [
      { label: 'Coverage', href: '/coverage' },
      { label: 'Contact', href: '/contact' },
      { label: 'Request Transport', href: '/request' },
    ],
    addressLines: ['2526 W. Freddy Gonzalez', 'Edinburg, TX 78539'],
    privacyLabel: 'Privacy policy',
    sitemapLabel: 'Sitemap',
    facebookLabel: 'Facebook',
    rights: 'All rights reserved.',
  },
}
