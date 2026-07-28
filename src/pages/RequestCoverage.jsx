import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaCheckCircle } from 'react-icons/fa'
import { submitForm, newSubmissionId } from '../lib/submitForm'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import { PrivacyNotice, FormStatus } from '../v2/components'
import './RequestCoverage.css'

const page = content.pages.request

const SERVICE_OPTIONS = [
  'Dialysis Transport',
  'Pediatric Therapy Transport',
  'Pediatric Transport',
  'Long-Distance Medical Transport',
  'Event EMS Standby',
  'Other / Not Sure',
]

export default function RequestCoverage() {
  const [form, setForm] = useState({ name:'', company:'', phone:'', email:'', service:'', date:'', location:'', details:'', website:'' })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const submissionId = useRef(newSubmissionId())
  const submittingRef = useRef(false)
  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const submit = async e => {
    e.preventDefault()
    // Honeypot: real users never see or fill this field.
    if (form.website) return
    if (submittingRef.current) return
    submittingRef.current = true
    setStatus('sending')
    try {
      await submitForm('transport-request', { ...form, submissionId: submissionId.current })
      setStatus('sent')
      submissionId.current = newSubmissionId()
    } catch (err) {
      setErrorMessage(err.message)
      setStatus('error')
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <InnerPage {...page} legacy>
    <div className="req-page">
      <section className="req-body">
        <div className="container">
          <div className="req-grid">
            {/* Form */}
            <div className="req-form-wrap">
              {status==='sent' ? (
                <div className="req-success" role="status">
                  <FaCheckCircle className="req-check" />
                  <h2>Request Submitted</h2>
                  <p>Our team will review the details and contact you to confirm availability. If anything is time sensitive, please call dispatch directly.</p>
                  <a href="tel:+19566606543" className="btn btn-blue"><FaPhone /> Call Dispatch</a>
                  <button className="btn btn-outline" onClick={()=>setStatus('idle')}>Submit Another Request</button>
                </div>
              ) : (
                <form onSubmit={submit} className="req-form">
                  <div className="req-form-row">
                    <div className="req-group"><label htmlFor="req-name">Full Name *</label><input id="req-name" name="name" type="text" autoComplete="name" placeholder="Your name" required value={form.name} onChange={handle}/></div>
                    <div className="req-group"><label htmlFor="req-company">Company / Organization</label><input id="req-company" name="company" type="text" autoComplete="organization" placeholder="School, clinic, event..." value={form.company} onChange={handle}/></div>
                  </div>
                  <div className="req-form-row">
                    <div className="req-group"><label htmlFor="req-phone">Phone Number *</label><input id="req-phone" name="phone" type="tel" autoComplete="tel" placeholder="(956) 000-0000" required value={form.phone} onChange={handle}/></div>
                    <div className="req-group"><label htmlFor="req-email">Email *</label><input id="req-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required value={form.email} onChange={handle}/></div>
                  </div>
                  <div className="req-group">
                    <label htmlFor="req-service">Type of Service *</label>
                    <select id="req-service" name="service" required value={form.service} onChange={handle} className="req-select">
                      <option value="">Select a service...</option>
                      {SERVICE_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="req-form-row">
                    <div className="req-group"><label htmlFor="req-date">Date Needed</label><input id="req-date" name="date" type="date" value={form.date} onChange={handle}/></div>
                    <div className="req-group"><label htmlFor="req-location">Location / City</label><input id="req-location" name="location" type="text" placeholder="Edinburg, McAllen..." value={form.location} onChange={handle}/></div>
                  </div>
                  <div className="req-group"><label htmlFor="req-details">Details *</label><textarea id="req-details" name="details" rows={5} placeholder="Please describe your transportation or standby needs..." required value={form.details} onChange={handle}/></div>
                  <div className="v2-visually-hidden" aria-hidden="true">
                    <label htmlFor="req-website">Leave this field blank</label>
                    <input id="req-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handle} />
                  </div>
                  <PrivacyNotice sensitive />
                  {status==='error' && (
                    <FormStatus state="error" title="Something went wrong.">
                      {errorMessage || 'Please call us at (956) 660-6543.'}
                    </FormStatus>
                  )}
                  <button type="submit" className="btn btn-blue req-submit" disabled={status==='sending'}>{status==='sending'?'Submitting…':'Submit Request →'}</button>
                  <p className="req-note">Submitting this form does not confirm transportation, crew availability, pricing, or scheduling. Our team will contact you to review and confirm the request. Call dispatch for immediate coordination.</p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="req-sidebar">
              <div className="req-info-box">
                <h2>Contact Dispatch Directly</h2>
                <a href="tel:+19566606543" className="btn btn-blue req-call"><FaPhone /> (956) 660-6543</a>
                <p>For immediate coordination or time-sensitive requests, call dispatch directly.</p>
              </div>

              <div className="req-info-box">
                <h2>Planning an Event?</h2>
                <p>{page.eventNote}</p>
                <Link to={page.eventHref} className="btn btn-outline req-event-link">{page.eventLinkLabel}</Link>
              </div>

              <div className="req-info-box">
                <h2>Government and Institutional Buyers</h2>
                <p>Agencies, districts, and prime contractors can review identifiers and download our capability statement.</p>
                <Link to="/government-contracting" className="btn btn-outline req-event-link">View Government Contracting</Link>
              </div>

              <div className="req-info-box">
                <h2>Services Available</h2>
                <ul className="req-svc-list">
                  {['Adult Dialysis Transportation','Pediatric Therapy Transportation','Pediatric Transportation','Long-Distance Medical Transport','Event EMS Standby'].map((s,i)=>(<li key={i}><FaCheckCircle className="req-dot"/>{s}</li>))}
                </ul>
              </div>

              <div className="req-info-box">
                <h2>Service Area</h2>
                <p>Edinburg · McAllen · Mission · Pharr · Weslaco · Harlingen · Brownsville and surrounding communities.</p>
                <p style={{marginTop:'8px', color:'var(--v2-blue-ink)'}}>Long-distance trips available across Texas. Contact us to confirm availability for your location.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </InnerPage>
  )
}
