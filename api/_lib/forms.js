// Registry of the four public forms this endpoint accepts. Prefixed
// directory (_lib) so Vercel does not deploy these as routes of their
// own — see https://vercel.com/docs/functions/functions-api-reference
// ("prefix a file or folder with an underscore to exclude it").
//
// Each field's `label` is what appears in the notification email, `max`
// bounds truncation, `required`/`isEmail` drive validation, and
// `type: 'checkbox'` marks boolean fields. Order here is the order
// fields appear in the email.

export const FORM_TYPES = ['transport-request', 'contact', 'event', 'government']

export const FORM_CONFIGS = {
  'transport-request': {
    subject: 'New Transport Request | Life Star EMS',
    pageSource: '/request',
    emailField: 'email',
    fields: [
      { key: 'name', label: 'Full Name', required: true, max: 120 },
      { key: 'company', label: 'Company / Organization', max: 160 },
      { key: 'phone', label: 'Phone Number', required: true, max: 30 },
      { key: 'email', label: 'Email', required: true, max: 200, isEmail: true },
      { key: 'service', label: 'Type of Service', required: true, max: 120 },
      { key: 'date', label: 'Date Needed', max: 40 },
      { key: 'location', label: 'Location / City', max: 160 },
      { key: 'details', label: 'Details', required: true, max: 4000 },
    ],
  },
  contact: {
    subject: 'New Website Contact | Life Star EMS',
    pageSource: '/contact',
    emailField: 'email',
    fields: [
      { key: 'name', label: 'Full Name', required: true, max: 120 },
      { key: 'phone', label: 'Phone', max: 30 },
      { key: 'email', label: 'Email', required: true, max: 200, isEmail: true },
      { key: 'message', label: 'Message', required: true, max: 4000 },
    ],
  },
  event: {
    subject: 'New Event Coverage Request | Life Star EMS',
    pageSource: '/services/events',
    emailField: 'email',
    fields: [
      { key: 'name', label: 'Full Name', required: true, max: 120 },
      { key: 'phone', label: 'Phone', required: true, max: 30 },
      { key: 'email', label: 'Email', required: true, max: 200, isEmail: true },
      { key: 'event_name', label: 'Event Name', required: true, max: 160 },
      { key: 'event_date', label: 'Event Date', max: 40 },
      { key: 'attendance', label: 'Expected Attendance', max: 60 },
      { key: 'event_location', label: 'Event Location', max: 160 },
      { key: 'event_type', label: 'Type of Event', max: 80 },
      { key: 'notes', label: 'Additional Notes', max: 4000 },
    ],
  },
  government: {
    subject: 'New Government Contracting Inquiry | Life Star EMS',
    pageSource: '/government-contracting',
    emailField: 'email',
    fields: [
      { key: 'name', label: 'Name', required: true, max: 120 },
      { key: 'organization', label: 'Organization', required: true, max: 160 },
      { key: 'agencyType', label: 'Agency or Company Type', required: true, max: 80 },
      { key: 'email', label: 'Email', required: true, max: 200, isEmail: true },
      { key: 'phone', label: 'Phone', max: 30 },
      { key: 'solicitation', label: 'Opportunity / Solicitation Number', max: 160 },
      { key: 'service', label: 'Service Needed', required: true, max: 120 },
      { key: 'location', label: 'Performance Location', max: 160 },
      { key: 'dates', label: 'Estimated Service Dates', max: 80 },
      { key: 'message', label: 'Message', required: true, max: 4000 },
      { key: 'wantsPdf', label: 'Capability Statement Requested', type: 'checkbox' },
      { key: 'contactMethod', label: 'Preferred Contact Method', max: 40 },
    ],
  },
}
