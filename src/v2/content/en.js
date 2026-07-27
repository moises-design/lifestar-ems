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
    phoneHref: 'tel:+19566606543',
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
      { label: 'Pediatric transportation', href: '/services/pediatrics' },
      { label: 'Event EMS standby', href: '/services/events' },
      { label: 'Long-distance medical transport', href: '/services/long-distance' },
    ],
    allServices: { label: 'All services', href: '/services' },
    coverage: { label: 'Coverage', href: '/coverage' },
    why: { label: 'Why Life Star', href: '/#why-life-star' },
    about: { label: 'About', href: '/about' },
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
      heading: 'Five services, one standard of care',
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
          title: 'Pediatric transportation',
          line: 'Safe, friendly transport for children, planned together with families and providers.',
          href: '/services/pediatrics',
        },
        {
          num: '04',
          title: 'Event EMS standby',
          line: 'On-site medical standby for school sports, tournaments, concerts, and community events.',
          href: '/services/events',
        },
        {
          num: '05',
          title: 'Long-distance medical transport',
          line: 'Coordinated interstate and cross-Texas trips with BLS crews.',
          href: '/services/long-distance',
        },
      ],
      linkLabel: 'Learn more',
      allLabel: 'View all services',
      allHref: '/services',
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

    realOps: {
      id: 'real-operations',
      heading: 'Real people. Real units. Ready to serve.',
      line:
        'Life Star EMS provides ambulance transportation, medical transportation, event EMS coverage, and operational support across South Texas.',
    },

    operations: {
      id: 'operations',
      label: '04 · Crew and operations',
      heading: 'Who shows up when you call',
      line: 'Here is a look at the people behind every ride and the preparation that goes into each trip.',
    },

    coverage: {
      id: 'coverage',
      label: '05 · Where we serve',
      heading: 'Across the Rio Grande Valley',
      line:
        'Edinburg, McAllen, Mission, Pharr, San Juan, Alamo, Donna, Weslaco, Mercedes, Harlingen, Los Fresnos, Brownsville, and Rio Grande City, with long-distance trips across Texas.',
      linkLabel: 'See our full service area',
      href: '/coverage',
      cities: ['Edinburg', 'McAllen', 'Mission', 'Pharr', 'San Juan', 'Alamo', 'Donna', 'Weslaco', 'Mercedes', 'Harlingen', 'Los Fresnos', 'Brownsville', 'Rio Grande City'],
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
      followLabel: 'Follow Life Star EMS on Facebook for recent updates from the field.',
      openPostLabel: 'View on Facebook',
      openPageLabel: 'Open our Facebook page',
      showTimelineLabel: 'Show recent posts here',
      loadingLabel: 'Loading posts from Facebook',
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

  // Inner-page V2 intros (used by src/v2/InnerPage.jsx). H1s live here;
  // the legacy page bodies below them keep their own content until the
  // full service-page redesign mission.
  pages: {
    services: {
      label: 'What we do',
      title: 'Our services',
      lead:
        'Life Star EMS provides scheduled, non-emergency medical transportation and event EMS standby across the Rio Grande Valley, with long-distance trips coordinated across Texas and interstate. For a medical emergency, call 911.',
      capabilities: [
        'Ground BLS ambulance transportation',
        'Family-owned, serving South Texas since 2009',
        'Scheduled dialysis, therapy, and pediatric transport',
        'Event EMS standby for school, community, and sporting events',
        'Long-distance and interstate patient transport',
        'Government and institutional contracting available',
      ],
      audience: {
        heading: 'Start where you are',
      },
      ctaHeading: 'Ready to schedule?',
      ctaLine: 'Send a request online, or call dispatch to talk through your transport needs.',
    },
    dialysis: {
      label: '01 · Dialysis transportation',
      title: 'Dialysis transportation across the Rio Grande Valley',
      lead:
        'Scheduled rides to and from dialysis treatment, coordinated around your center’s calendar and your treatment days.',
    },
    therapy: {
      label: '02 · Pediatric therapy transportation',
      title: 'Pediatric therapy transportation',
      lead:
        'Dependable transportation for children attending physical, occupational, and speech therapy appointments across the Valley.',
    },
    pediatrics: {
      label: '03 · Pediatric and long-distance transportation',
      title: 'Safe, friendly pediatric transportation',
      lead:
        'Helping children get to care safely and on time, with long-distance trips across Texas planned together with families and providers.',
    },
    events: {
      label: '04 · Event EMS standby',
      title: 'Sports and event medical standby',
      lead:
        'On-site EMS standby for school sports, tournaments, concerts, and community events across the Rio Grande Valley.',
    },
    longDistance: {
      label: 'Long-distance patient transport',
      title: 'Long-distance patient transport across Texas and interstate',
      lead:
        'Life Star EMS coordinates long-distance patient transportation across Texas and interstate destinations, with BLS crews. Transport availability, staffing, equipment, and clinical requirements are confirmed for each trip.',
    },
    request: {
      label: 'Get started',
      title: 'Request Transport',
      lead:
        'Submit your transportation or event standby request. Our team will review the details and contact you to confirm availability.',
      eventNote: 'Planning an event? Event standby requests have their own form.',
      eventLinkLabel: 'Go to the event standby form',
      eventHref: '/services/events',
    },
    coverage: {
      label: 'Service area',
      title: 'Where we serve',
      lead:
        'Scheduled transportation and event standby across the Rio Grande Valley, with long-distance trips available throughout Texas. Contact us to confirm availability for your location and schedule.',
    },
    contact: {
      label: 'Contact',
      title: 'Contact Life Star EMS',
      lead:
        'Call dispatch for scheduling, or send us a message and our team will follow up with you.',
    },
    about: {
      label: 'About us',
      title: 'About Life Star EMS',
      lead:
        'A family-owned EMS provider serving the Rio Grande Valley since 2009, with scheduled medical transportation, event standby, and disaster response support.',
      story: {
        heading: 'Who we are',
        body:
          'Life Star EMS Inc. is a family-owned, woman-owned ambulance and medical transportation company headquartered in Edinburg, Texas. Since 2009, our crews have provided scheduled medical transportation, event EMS standby, and disaster response medical support across the Rio Grande Valley and South Texas.',
      },
      leadership: {
        heading: 'Leadership',
        name: 'Heather Ayala-Segovia',
        title: 'CEO, Life Star EMS Inc.',
        bio:
          'Heather Ayala-Segovia serves as CEO of Life Star EMS Inc. She leads the company with a focus on patient care, dependable operations, and service to South Texas communities. Under her leadership, Life Star EMS provides ambulance transportation, medical transportation, event EMS coverage, and disaster-response support.',
      },
    },
  },

  footer: {
    description:
      'Scheduled non-emergency medical transportation and event EMS standby services across the Rio Grande Valley.',
    servicesTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    serviceLinks: [
      { label: 'All services', href: '/services' },
      { label: 'Dialysis transportation', href: '/services/dialysis' },
      { label: 'Pediatric therapy transportation', href: '/services/therapy' },
      { label: 'Pediatric transportation', href: '/services/pediatrics' },
      { label: 'Event EMS standby', href: '/services/events' },
      { label: 'Long-distance medical transport', href: '/services/long-distance' },
    ],
    companyLinks: [
      { label: 'About', href: '/about' },
      { label: 'Coverage', href: '/coverage' },
      { label: 'Government contracting', href: '/government-contracting' },
      { label: 'Contact', href: '/contact' },
      { label: 'Request Transport', href: '/request' },
    ],
    // Street address withheld from the footer until the owner verifies it
    // as the correct public business address (docs/SEO-FACT-VERIFICATION.md 4.x).
    regionLine: 'Serving the Rio Grande Valley from Edinburg, Texas',
    privacyLabel: 'Privacy policy',
    privacyHref: '/privacy',
    sitemapLabel: 'Sitemap',
    sitemapHref: '/sitemap',
    facebookLabel: 'Facebook',
    rights: 'All rights reserved.',
  },
}
