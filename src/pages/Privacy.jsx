import { Link } from 'react-router-dom'
import InnerPage from '../v2/InnerPage'
import './Privacy.css'

// Built only from this site's actual, verifiable data flows (forms,
// database tables, RLS policies, and third-party embeds as they exist in
// this codebase today). No Notice of Privacy Practices exists yet for
// Life Star EMS Inc. — see docs/NOTICE-OF-PRIVACY-PRACTICES-REQUIRED.md.
// This page makes no HIPAA-compliance claim.
export default function Privacy() {
  return (
    <InnerPage
      label="Privacy"
      title="Privacy Notice"
      lead="How Life Star EMS handles information submitted through this website."
      breadcrumb={[{ label: 'Privacy' }]}
    >
      <div className="v2-container-text v2-section privacy-body">
        <p className="v2-small privacy-updated">This notice describes this website's current practices. It is not a Notice of Privacy Practices under HIPAA.</p>

        <section>
          <h2>What we collect</h2>
          <p>
            When you submit a form on this site (Contact, Request Transport,
            Event EMS request, or Long-Distance Transport request), we
            collect the information you enter: your name, phone number,
            email address, and the message or trip details you provide. The
            Long-Distance Transport form also asks for a pickup city,
            destination city, and travel date, and includes an optional
            free-text field for any special needs related to the trip.
          </p>
          <p>
            We do not use cookies, analytics scripts, or advertising
            trackers on this site. If you view the Facebook post timeline on
            our homepage, Facebook may set its own cookies once that embed
            loads; we do not control that behavior, and it only happens if
            that section loads in your browser.
          </p>
        </section>

        <section>
          <h2>Please avoid sensitive medical details in forms</h2>
          <p>
            Our web forms are not a secure channel for detailed medical
            information. Please do not include diagnoses, medical record
            numbers, or other sensitive health details in a form on this
            site. If we need clinical details to arrange your transport,
            our team will ask for them by phone.
          </p>
        </section>

        <section>
          <h2>How we use it</h2>
          <p>
            We use the information you submit only to respond to your
            request, confirm and coordinate transportation or event
            coverage, and contact you about your inquiry. We do not sell
            your information, and we do not use it for advertising.
          </p>
        </section>

        <section>
          <h2>Where it is stored</h2>
          <p>
            Form submissions are stored in a Supabase-hosted database.
            Row-level security policies restrict write access to new
            submissions only (no one can read, edit, or delete existing
            submissions through the public website), and read access is
            limited to authenticated Life Star EMS staff accounts.
          </p>
        </section>

        <section>
          <h2>Retention, access, and deletion</h2>
          <p>
            If you would like to know what information we have on file for
            you, or would like it corrected or deleted, contact us at{' '}
            <a href="tel:+19566606543">(956) 660-6543</a> or through the{' '}
            <Link to="/contact">contact page</Link> and we will respond to
            your request.
          </p>
        </section>

        <section>
          <h2>Medical emergencies</h2>
          <p>
            This website and its forms are not monitored for emergencies.
            If you have a medical emergency, call 911.
          </p>
        </section>

        <section>
          <h2>Questions</h2>
          <p>
            Contact Life Star EMS at{' '}
            <a href="tel:+19566606543">(956) 660-6543</a> with any privacy
            questions about this website.
          </p>
        </section>
      </div>
    </InnerPage>
  )
}
