import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaBriefcaseMedical } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import './ServicePage.css'
import './EventStandby.css'

const eventTypes = [
  {icon:'🏈',label:'Football Games',desc:'Friday night lights, varsity, JV, playoff games'},
  {icon:'⚽',label:'Soccer Matches',desc:'League games, tournaments, championships'},
  {icon:'🏃',label:'5K & Fun Runs',desc:'Community races, charity runs, marathons'},
  {icon:'🎵',label:'Concerts & Festivals',desc:'Music events, outdoor festivals, fairs'},
  {icon:'🏀',label:'Basketball Events',desc:'Indoor/outdoor tournaments and games'},
  {icon:'🎓',label:'School Events',desc:'Graduations, track meets, field days'},
  {icon:'🏆',label:'Sports Tournaments',desc:'Multi-team events, championships'},
  {icon:'🌟',label:'Community Events',desc:'City events, parades, non-profit gatherings'},
]

// Community-partner logos removed per owner decision 8: partner
// organization claims stay hidden until relationships and naming
// permission are verified (docs/SEO-FACT-VERIFICATION.md §12).

export default function EventStandby() {
  const [form, setForm] = useState({name:'',phone:'',email:'',event_name:'',event_date:'',event_location:'',attendance:'',event_type:'',notes:''})
  const [status, setStatus] = useState('idle')
  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const submit = async e => {
    e.preventDefault(); setStatus('sending')
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
        </>
      }
    >
    <div className="sp event-sp">
      {/* Event types */}
      <section className="event-types section">
        <div className="container">
          <span className="label">Events We Cover</span>
          <h2 className="title">Any Sport.<br /><em>Any Event. Any Size.</em></h2>
          <div className="ev-type-grid">
            {eventTypes.map((t,i)=>(
              <div key={i} className="ev-type-card">
                <span className="ev-type-icon">{t.icon}</span>
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
                {['Certified EMT and Paramedic crews on standby','Fully equipped ambulance on site','Fast on-site medical response','AED, oxygen, and medical equipment','Bilingual staff — English & Spanish','Coordination with local EMS and hospitals','Post-event incident reports available','Flexible packages for any event size'].map((item,i)=>(<li key={i}><span className="sp-list-dot"/>{item}</li>))}
              </ul>
            </div>
            <div className="sp-cta-box event-form-box">
              {status==='sent' ? (
                <div className="form-success"><span>✅</span><h3>Request Received!</h3><p>Our team will review your event details and contact you to confirm availability and pricing.</p></div>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="form-title">🏆 Request Event Coverage</h3>
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
                  {status==='error'&&<p className="form-error">Something went wrong. Please call us at (956) 660-6543.</p>}
                  <button type="submit" className="btn btn-blue ev-submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Request Free Quote →'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta-banner event-cta-banner">
        <div className="container">
          <h2>Let's Cover Your Event</h2>
          <p>Call us for a free quote — we'll build a plan around your event needs.</p>
          <Link to="/request" className="btn btn-blue"><FaBriefcaseMedical /> Request Event Coverage</Link>
          <a href="tel:+19566606543" className="btn btn-outline"><FaPhone /> Call Now</a>
        </div>
      </section>
    </div>
    </InnerPage>
  )
}
