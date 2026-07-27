import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaPhone, FaBriefcaseMedical, FaFootballBall, FaFutbol, FaRunning,
  FaMusic, FaBasketballBall, FaGraduationCap, FaTrophy, FaUsers,
} from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import InnerPage from '../v2/InnerPage'
import Picture from '../v2/Picture'
import { content } from '../v2/content'
import { AccessibleIcon, FormStatus, PrivacyNotice } from '../v2/components'
import './ServicePage.css'
import './EventStandby.css'

const eventTypes = [
  {Icon:FaFootballBall,label:'Football Games',desc:'Friday night lights, varsity, JV, playoff games'},
  {Icon:FaFutbol,label:'Soccer Matches',desc:'League games, tournaments, championships'},
  {Icon:FaRunning,label:'5K & Fun Runs',desc:'Community races, charity runs, marathons'},
  {Icon:FaMusic,label:'Concerts & Festivals',desc:'Music events, outdoor festivals, fairs'},
  {Icon:FaBasketballBall,label:'Basketball Events',desc:'Indoor/outdoor tournaments and games'},
  {Icon:FaGraduationCap,label:'School Events',desc:'Graduations, track meets, field days'},
  {Icon:FaTrophy,label:'Sports Tournaments',desc:'Multi-team events, championships'},
  {Icon:FaUsers,label:'Community Events',desc:'City events, parades, non-profit gatherings'},
]

// Community-partner logos removed per owner decision 8: partner
// organization claims stay hidden until relationships and naming
// permission are verified (docs/SEO-FACT-VERIFICATION.md §12).

export default function EventStandby() {
  const [form, setForm] = useState({name:'',phone:'',email:'',event_name:'',event_date:'',event_location:'',attendance:'',event_type:'',notes:'',website:''})
  const [status, setStatus] = useState('idle')
  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const submit = async e => {
    e.preventDefault()
    // Honeypot: real users never see or fill this field.
    if (form.website) return
    setStatus('sending')
    try {
      const message = `EVENT: ${form.event_name} | Date: ${form.event_date} | Location: ${form.event_location} | Attendance: ${form.attendance} | Type: ${form.event_type} | Notes: ${form.notes}`
      const {error} = await supabase.from('contact_submissions').insert([{name:form.name,phone:form.phone,email:form.email,message,created_at:new Date().toISOString()}])
      if (error) throw error
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <InnerPage
      {...content.pages.events}
      breadcrumb={[{ label: 'Services' }, { label: 'Event EMS standby' }]}
      legacy
      cta={
        <>
          <a href="#event-form" className="v2-btn v2-btn-primary">Request Event Coverage</a>
          <a href="tel:+19566606543" className="v2-btn v2-btn-secondary">Call dispatch (956) 660-6543</a>
          <Link to="/government-contracting" className="v2home-quiet-link">Government or institutional buyer? View Government Contracting</Link>
        </>
      }
      media={
        <div className="event-hero-photo-frame v2-panel">
          <Picture
            src="/images/company/optimized/event-mission-stadium.jpg"
            webp="/images/company/optimized/event-mission-stadium.webp"
            alt="Life Star EMS personnel and medical transport equipment supporting an athletic event at Tom Landry Stadium."
            width={414}
            height={414}
            loading="lazy"
            className="event-hero-photo"
          />
        </div>
      }
    >
    <div className="sp event-sp">
      {/* Event types */}
      <section className="event-types section">
        <div className="container">
          <span className="label">Events We Cover</span>
          <h2 className="title">Medical Standby<br /><em>For Your Event</em></h2>
          <div className="ev-type-grid">
            {eventTypes.map((t,i)=>(
              <div key={i} className="ev-type-card">
                <AccessibleIcon icon={t.Icon} className="ev-type-icon-wrap" size={22} />
                <h3>{t.label}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we provide + form */}
      <section className="sp-two" id="event-form">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">What We Provide</span>
              <h2 className="title">Full On-Site<br /><em>Medical Coverage</em></h2>
              <ul className="sp-list">
                {['BLS ambulance and trained EMS personnel configured according to the approved event coverage plan','On-site medical response for your attendees','AED, oxygen, and medical equipment','Bilingual staff — English & Spanish','Coordination with local EMS and hospitals','Post-event incident reports available','Event coverage experience for crowds of up to approximately 5,000'].map((item,i)=>(<li key={i}><span className="sp-list-dot"/>{item}</li>))}
              </ul>
            </div>
            <div className="sp-cta-box event-form-box">
              {status==='sent' ? (
                <FormStatus state="success" title="Request Received!">
                  Our team will review your event details and contact you to confirm availability and pricing.
                </FormStatus>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="form-title">Request Event Coverage</h3>
                  <div className="form-row">
                    <div className="form-group"><label>Your Name *</label><input name="name" type="text" placeholder="John Doe" required value={form.name} onChange={handle}/></div>
                    <div className="form-group"><label>Phone *</label><input name="phone" type="tel" placeholder="(956) 000-0000" required value={form.phone} onChange={handle}/></div>
                  </div>
                  <div className="form-group"><label>Email *</label><input name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handle}/></div>
                  <div className="form-group"><label>Event Name *</label><input name="event_name" type="text" placeholder="e.g. PSJA vs Edinburg Football" required value={form.event_name} onChange={handle}/></div>
                  <div className="form-row">
                    <div className="form-group"><label>Event Date</label><input name="event_date" type="date" value={form.event_date} onChange={handle}/></div>
                    <div className="form-group"><label>Expected Attendance</label><input name="attendance" type="text" placeholder="e.g. 500 people" value={form.attendance} onChange={handle}/></div>
                  </div>
                  <div className="form-group"><label>Event Location</label><input name="event_location" type="text" placeholder="Stadium, venue, or address" value={form.event_location} onChange={handle}/></div>
                  <div className="form-group"><label>Type of Event</label>
                    <select name="event_type" value={form.event_type} onChange={handle} className="ev-select">
                      <option value="">Select type...</option>
                      <option>Football Game</option><option>Soccer Match</option><option>Basketball Tournament</option>
                      <option>5K / Fun Run / Marathon</option><option>Concert / Music Festival</option>
                      <option>School / CISD Event</option><option>Community Festival</option>
                      <option>Non-Profit Event</option><option>Other Sports Event</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Additional Notes</label><textarea name="notes" rows={3} placeholder="Any special requirements..." value={form.notes} onChange={handle}/></div>
                  <div className="v2-visually-hidden" aria-hidden="true">
                    <label htmlFor="ev-website">Leave this field blank</label>
                    <input id="ev-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handle} />
                  </div>
                  <PrivacyNotice sensitive />
                  {status==='error'&&(
                    <FormStatus state="error" title="Something went wrong.">
                      Please call us at (956) 660-6543 and we'll take your event details by phone.
                    </FormStatus>
                  )}
                  <button type="submit" className="btn btn-blue ev-submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Request Event Coverage →'}</button>
                  <p className="ev-note">Submitting this request does not confirm staffing, pricing, or event coverage — our team will follow up to confirm availability. Call dispatch for immediate coordination.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta-banner event-cta-banner">
        <div className="container">
          <h2>Let's Cover Your Event</h2>
          <p>Call us to discuss your event — we'll build a coverage plan around your needs.</p>
          <Link to="/request" className="btn btn-blue"><FaBriefcaseMedical /> Request Event Coverage</Link>
          <a href="tel:+19566606543" className="btn btn-outline"><FaPhone /> Call Now</a>
        </div>
      </section>
    </div>
    </InnerPage>
  )
}
