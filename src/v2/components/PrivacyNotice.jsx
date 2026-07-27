import { Link } from 'react-router-dom'

// A short, honest notice placed near every form that collects contact
// information. Does not claim HIPAA compliance or any certification —
// only describes what the form is for and links to the real privacy
// page. `sensitive` adds an explicit warning against including medical
// details in free-text fields, for forms most likely to invite them.
export default function PrivacyNotice({ sensitive = false, className = '' }) {
  return (
    <p className={`v2-privacy-notice ${className}`}>
      {sensitive && (
        <>
          Please do not include medical details, diagnoses, or other
          sensitive health information in this form. We only need enough
          information to arrange transport and will ask for anything else
          by phone.{' '}
        </>
      )}
      We use the information you submit only to respond to your request.
      See our <Link to="/privacy">privacy notice</Link> for details.
    </p>
  )
}
