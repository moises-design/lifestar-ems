import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaCheckCircle, FaBriefcaseMedical, FaUserNurse, FaAmbulance } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
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

const clients = [
  {name:'Boys & Girls Club of McAllen',logo:'/images/boys-girls-club.svg'},
  {name:'PSJA ISD',logo:'/images/psja.svg'},
  {name:'Mission CISD',logo:'/images/mission-cisd.svg'},
  {name:'Sharyland ISD',logo:'/images/sharyland.svg'},
  {name:'Edinburg CISD',logo:'/images/edinburg-cisd.svg'},
  {name:'UTRGV',logo:'/images/utrgv.svg'},
  {name:'Special Olympics Texas',logo:'/images/special-olympics.svg'},
]

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
    <div className="sp event-sp">
      <section className="sp-hero event-hero">
        <div className="sp-hero-bg event-bg">
          <div className="event-field" />
          <div className="event-sports-row">
            {['🏈','⚽','🏃','🏀','🎵','🏆'].map((icon,i)=>(
              <span key={i} className="ev-sport" style={{left:`${8+i*16}%`,animationDelay:`${i*0.5}s`}}>{icon}</span>
            ))}
          </div>
        </div>
        <div className="container sp-inner">
          <div className="sp-badge event-badge"><FaBriefcaseMedical style={{marginRight:6}}/>EMS On-Site Coverage</div>
          <h1 className="sp-h1">Sports &<br /><span className="sp-accent event-accent">Event Medical Standby</span></h1>
          <p className="sp-lead">Life Star EMS keeps athletes, fans, and attendees safe. Professional EMT and paramedic crews on-site — from Friday night football to 5K runs, concerts, and community events across the Rio Grande Valley.</p>
          <div className="sp-btns">
            <Link to="/request" className="btn btn-blue"><FaBriefcaseMedical /> Request Event Coverage</Link>
            <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> (956) 660-6543</a>
          </div>
        </div>
        <div className="event-scoreboard">
          {[['EMT','Certified'],['BLS/ALS','Licensed'],['RGV','Coverage']].map(([v,l],i)=>(
            <div key={i} className="sb-item"><span className="sb-val">{v}</span><span className="sb-lbl">{l}</span></div>
          ))}
        </div>
      </section>

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

      {/* Community Partners */}
      <section className="event-clients section">
        <div className="container">
          <span className="label">Trusted By</span>
          <h2 className="title">Community<br /><em>Partners</em></h2>
          <p className="subtitle">Proud to support and serve these organizations across the Rio Grande Valley.</p>
          <div className="clients-grid">
            {clients.map((c,i)=>(
              <div key={i} className="client-card">
                <img src={c.logo} alt={c.name} className="client-logo" />
                <span className="client-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we provide + form */}
      <section className="sp-two">
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
                <div className="form-success"><span>✅</span><h3>Request Received!</h3><p>We'll contact you within 24 hours with a custom quote.</p></div>
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
          <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> Call Now</a>
        </div>
      </section>
    </div>
  )
}
