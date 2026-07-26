// ============================================================
// Government Contracting Hub content.
//
// SOURCE OF TRUTH: docs/source/Life_Star_EMS_Capability_Statement.pdf
// (committed at 3b2fbb6, sha256 da4b2a80...9911462c1). Every fact in
// this file comes from that company-provided document or from facts
// already verified elsewhere on this site (the 24/7 dispatch line).
// Do not add identifiers, certifications, contract history, or
// metrics that are not in the source document.
//
// Factual safeguards honored here:
// - 956-309-3052 is the contracting/administrative contact;
//   956-660-6543 is the 24/7 dispatch line; always labeled.
// - DSHS provider wording is exactly "Current, Ground Only, BLS".
//   No ALS-provider licensure claim anywhere.
// - ACLS/PALS appear only as personnel training (per the document).
// - Ownership is presented as company-provided information, not as
//   SBA or agency certification.
// - No invented contract values, dates, metrics, or numbers.
// ============================================================

export const gov = {
  route: '/government-contracting',
  pdfPublicPath: '/documents/life-star-ems-capability-statement.pdf',
  pdfTitle: 'Life Star EMS Capability Statement',
  pdfMeta: 'PDF · 1 page · 1.2 MB',

  contact: {
    name: 'Heather Ayala-Segovia',
    title: 'CEO',
    company: 'Life Star EMS Inc.',
    phoneDisplay: '(956) 309-3052',
    phoneHref: 'tel:+19563093052',
    phoneLabel: 'Contracting and Administrative Contact',
    email: 'lifestarems.rgv@gmail.com',
    addressLines: ['2526 W Freddy Gonzalez Dr', 'Edinburg, TX 78539'],
    dispatchLabel: '24/7 Dispatch',
    dispatchDisplay: '(956) 660-6543',
    dispatchHref: 'tel:+19566606543',
    dispatchNote: 'For active transports and immediate operational needs.',
  },

  hero: {
    label: 'Government Contracting',
    heading: 'Reliable EMS and medical transportation support for public agencies',
    lead:
      'Life Star EMS Inc. supports federal, state, local, school district, university, healthcare, emergency management, and prime contractor requirements across South Texas and beyond.',
    downloadLabel: 'Download Capability Statement',
    inquiryLabel: 'Request Contracting Information',
    identifiersLinkLabel: 'View company identifiers',
  },

  // Compact identity panel in the hero. Values verbatim from the PDF.
  identityPanel: [
    { label: 'UEI', value: 'FTFKVKQ5VVU8', copy: true },
    { label: 'CAGE', value: '5QX65', copy: true },
    { label: 'SAM', value: 'Active', copy: false },
    { label: 'Primary NAICS', value: '621910', copy: true },
    { label: 'TX DSHS', value: '1000256', copy: true },
  ],

  overview: {
    label: '01 · Overview',
    heading: 'An Edinburg-based EMS provider, serving South Texas since 2009',
    body:
      'Life Star EMS Inc. is a family-owned ambulance and medical transportation company headquartered in Edinburg, Texas. Since 2009 our crews have provided scheduled medical transportation, event EMS standby, and disaster response medical support across the Rio Grande Valley and South Texas, with long-distance transport experience across state lines.',
    buyers: [
      'Federal agencies',
      'State agencies',
      'Cities and counties',
      'School districts',
      'Universities',
      'Healthcare systems',
      'Emergency management organizations',
      'Prime contractors',
      'Event organizers requiring formal EMS support',
    ],
  },

  leadership: {
    heading: 'Woman-Owned Leadership',
    body: [
      'Life Star EMS Inc. is a woman-owned and family-operated EMS provider based in Edinburg, Texas. Since 2009, the company has supported patients, healthcare facilities, schools, universities, public agencies, and community events throughout South Texas.',
      'Under Heather Ayala-Segovia’s leadership, Life Star EMS focuses on dependable service, operational readiness, bilingual patient support, and long-term relationships with the communities it serves.',
    ],
    name: 'Heather Ayala-Segovia',
    title: 'CEO, Life Star EMS Inc.',
    safeguard:
      'Woman-owned status is based on company-provided information. Certification requirements should be verified for each solicitation.',
  },

  capabilities: {
    label: '02 · Core capabilities',
    heading: 'Transportation and EMS services',
    note:
      'Operational capabilities, staffing, and solicitation compliance are confirmed for each opportunity.',
    groups: [
      {
        title: 'Ambulance and medical transportation',
        items: [
          'BLS ambulance transportation',
          'Non-emergency medical transportation',
          'Wheelchair transportation',
          'Stretcher transportation',
          'Bariatric transportation',
        ],
      },
      {
        title: 'Specialized patient transport',
        items: [
          'Pediatric and neonatal transportation',
          'Dialysis transportation',
          'Hospice and nursing home transportation',
          'Hospital discharge transportation',
          'Long-distance interstate transport',
        ],
      },
      {
        title: 'Events and field operations',
        items: [
          'Event EMS standby',
          'School athletics EMS coverage',
          'First aid and medical support',
          'Disaster response medical support',
          'Mexico-to-U.S. border patient transfer coordination',
        ],
      },
    ],
  },

  differentiators: {
    label: '03 · Differentiators',
    heading: 'Built for dependable field operations',
    items: [
      'Serving South Texas since 2009',
      'Family-owned and locally operated',
      '24/7 dispatch',
      'Bilingual English and Spanish-speaking crews',
      'Approximately 10 ambulance units',
      'GPS and CAD-supported dispatch',
      'Electronic patient care reporting',
      'Power stretchers and bariatric equipment',
      'Cardiac monitors, ventilators, and IV pumps',
      'Long-distance interstate experience, including Michigan and California',
      'Event coverage experience for crowds of up to approximately 5,000',
      'Regional and disaster response experience',
      'Border-region operational familiarity',
    ],
  },

  experience: {
    label: '04 · Representative experience',
    heading: 'Representative organizations and operational experience',
    note:
      'The organizations and operations listed reflect representative service experience provided by the company. They are not presented as formally awarded federal contracts. References and past performance details are provided per solicitation.',
    schools: [
      'PSJA ISD',
      'Edinburg CISD',
      'Mission CISD',
      'Sharyland ISD',
      'UTRGV football, baseball, basketball, volleyball, and campus events',
    ],
    operations: [
      'COVID-19 response operations',
      'Hurricane response deployments supporting Houston and Rockport',
    ],
  },

  identifiers: {
    id: 'identifiers',
    label: '05 · Company identifiers',
    heading: 'Identifiers and codes',
    ownershipNote:
      'Company-provided ownership information. Certification status should be verified for each solicitation.',
    corporate: [
      { label: 'Legal name', value: 'Life Star EMS Inc.' },
      { label: 'Founded', value: '2009' },
      { label: 'Headquarters', value: 'Edinburg, Texas' },
      { label: 'Service area', value: 'South Texas and long-distance' },
      { label: 'Ownership', value: 'Woman-owned, minority-owned, Hispanic American-owned', qualifier: true },
    ],
    registrations: [
      { label: 'UEI', value: 'FTFKVKQ5VVU8', copy: true },
      { label: 'CAGE', value: '5QX65', copy: true },
      { label: 'SAM registration', value: 'Active' },
      { label: 'Texas registration', value: 'Texas CMBL' },
      { label: 'TX DSHS provider', value: '1000256', copy: true },
      { label: 'DSHS status', value: 'Current, Ground Only, BLS' },
    ],
    codes: [
      { label: 'Primary NAICS', value: '621910', detail: 'Ambulance Services', copy: true },
      { label: 'Additional NAICS', value: '485991, 621999, 624230' },
      { label: 'PSC', value: 'V225', detail: 'Ambulance', copy: true },
      { label: 'PSC', value: 'Q999', detail: 'Medical, Other', copy: true },
    ],
  },

  readiness: {
    label: '06 · Operational readiness',
    heading: 'Licensed, trained, and dispatch-ready',
    items: [
      'Texas DSHS Licensed EMS Provider (Current, Ground Only, BLS)',
      'NIMS and ICS-trained personnel',
      'CPR, ACLS, and PALS-trained personnel',
      '24/7 dispatch and field operations',
      'FEMA disaster response registry',
      'Bilingual crews',
      'Electronic patient care reporting',
      'GPS and CAD operations',
    ],
  },

  support: {
    label: '07 · Who we support',
    heading: 'Common requirements we serve',
    items: [
      'School athletics and campus events',
      'Municipal and county events',
      'Emergency shelter and evacuation support',
      'Hospital and facility transportation',
      'Public health operations',
      'Disaster response support',
      'Large community events',
      'Prime contractor medical support',
      'Long-distance patient movement',
      'Border-region transfer coordination',
    ],
  },

  download: {
    id: 'capability-statement',
    label: '08 · Capability statement',
    heading: 'Download the capability statement',
    line:
      'A one-page overview of capabilities, identifiers, codes, differentiators, and contacts for contracting officers and buyers.',
    openLabel: 'Open in new tab',
    disclaimer:
      'Capabilities shown are based on company-provided information. Verify solicitation-specific requirements before submission.',
  },

  inquiry: {
    id: 'inquiry',
    label: '09 · Contracting inquiry',
    heading: 'Request contracting information',
    line:
      'Tell us about your requirement and our team will follow up with the information you need. This form is for contracting and administrative inquiries, not for scheduling rides.',
    agencyTypes: [
      'Federal agency',
      'State agency',
      'City or county',
      'School district',
      'University or college',
      'Healthcare system',
      'Emergency management',
      'Prime contractor',
      'Event organizer',
      'Other',
    ],
    services: [
      'Ambulance transportation',
      'Non-emergency medical transportation',
      'Event EMS standby',
      'Disaster response support',
      'Long-distance transport',
      'Other / multiple services',
    ],
    contactMethods: ['Email', 'Phone'],
    successHeading: 'Inquiry received',
    successLine:
      'Our team will review your requirement and follow up. For anything time sensitive, call the contracting line directly.',
    errorLine: 'Something went wrong. Please call (956) 309-3052 or email lifestarems.rgv@gmail.com.',
  },

  faq: {
    label: '10 · Questions from buyers',
    heading: 'Procurement FAQ',
    items: [
      {
        q: 'What geographic areas does Life Star EMS serve?',
        a: 'We are headquartered in Edinburg, Texas and serve South Texas, with long-distance transport experience across state lines, including trips to Michigan and California.',
      },
      {
        q: 'Does Life Star EMS support school and university events?',
        a: 'Yes. Representative experience includes event EMS support for PSJA ISD, Edinburg CISD, Mission CISD, Sharyland ISD, and UTRGV athletics and campus events.',
      },
      {
        q: 'Can Life Star EMS support disaster response operations?',
        a: 'Our personnel are NIMS and ICS trained, the company is listed in the FEMA disaster response registry, and our experience includes COVID-19 operations and hurricane response deployments supporting Houston and Rockport.',
      },
      {
        q: 'Does Life Star EMS provide long-distance transportation?',
        a: 'Yes. We provide long-distance interstate patient transport, with experience that includes trips to Michigan and California.',
      },
      {
        q: 'Is Life Star EMS registered in SAM.gov?',
        a: 'Yes. Our SAM registration is active. UEI FTFKVKQ5VVU8, CAGE 5QX65. We are also registered on the Texas CMBL.',
      },
      {
        q: 'Where can I download the capability statement?',
        a: 'The one-page capability statement is available on this page as a PDF download, and we can email it on request.',
      },
      {
        q: 'Who should contracting officers contact?',
        a: 'Heather Ayala-Segovia, CEO, at (956) 309-3052 or lifestarems.rgv@gmail.com. For active transports and immediate operational needs, our 24/7 dispatch line is (956) 660-6543.',
      },
      {
        q: 'How are licensing and solicitation-specific requirements verified?',
        a: 'Life Star EMS Inc. is a Texas DSHS licensed EMS provider (provider 1000256, Current, Ground Only, BLS). Licensing documentation, staffing plans, and solicitation-specific compliance are confirmed and provided for each opportunity before submission.',
      },
    ],
  },

  finalCta: {
    heading: 'Discuss your EMS or medical transportation requirement',
    line: 'Our team responds to agency, district, university, and prime contractor inquiries directly.',
  },

  homepage: {
    heading: 'Government and institutional services',
    line:
      'Life Star EMS supports school districts, universities, municipalities, healthcare organizations, emergency management operations, and prime contractors.',
    viewLabel: 'View Government Contracting',
    downloadLabel: 'Download Capability Statement',
  },

  navLabel: 'Government',
  footer: {
    title: 'Government',
    links: [
      { label: 'Government Contracting', href: '/government-contracting' },
      { label: 'Capability Statement', href: '/documents/life-star-ems-capability-statement.pdf', external: true },
      { label: 'Company Identifiers', href: '/government-contracting#identifiers' },
      { label: 'Request Contracting Information', href: '/government-contracting#inquiry' },
    ],
  },
}
