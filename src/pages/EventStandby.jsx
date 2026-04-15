import { useState } from 'react'
import { FaPhone, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './ServicePage.css'
import './EventStandby.css'

const eventTypes = [
  { icon: '🏫', label: 'School Events', desc: 'Track meets, graduations, sporting events' },
  { icon: '🏆', label: 'Sports Events', desc: 'Football, soccer, basketball, tournaments' },
  { icon: '🎭', label: 'Community Events', desc: 'Festivals, concerts, parades, fairs' },
  { icon: '🏙️', label: 'City Events', desc: 'Municipal events, public gatherings' },
  { icon: '🏢', label: 'Corporate Events', desc: 'Company gatherings, conferences' },
  { icon: '🌟', label: 'Non-Profit Events', desc: 'Fundraisers, awareness events, charity runs' },
]

const clients = [
  { name: 'Boys & Girls Club of McAllen', icon: '🏅' },
  { name: 'PSJA ISD', icon: '🎓' },
  { name: 'Mission CISD', icon: '🎓' },
  { name: 'Sharyland ISD', icon: '🎓' },
  { name: 'Edinburg CISD', icon: '🎓' },
  { name: 'UTRGV', icon: '🎓' },
  { name: 'Special Olympics Texas', icon: '🥇' },
  { name: 'Non-Profit Organizations', icon: '❤️' },
]

export default function EventStandby() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', event_name: '',
    event_date: '', event_location: '', attendance: '', event_type: '', notes: '',
  })
  const [status, setStatus] = useState('idle')

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const message = `EVENT: ${form.event_name} | Date: ${form.event_date} | Location: ${form.event_location} | Attendance: ${form.attendance} | Type: ${form.event_type} | Notes: ${form.notes}`
      const { error } = await supabase.from('contact_submissions').insert([{
        name: form.name, phone: form.phone, email: form.email,
        message, created_at: new Date().toISOString(),
      }])
      if (error) throw error
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <div className="service-page event-page">
      <section className="sp-hero event-hero">
        <div className="sp-hero-bg" />
        <div className="event-confetti">
          {['🎉', '⭐', '🏅', '🎊', '✨', '🌟'].map((e, i) => (
            <span key={i} className="confetti-item" style={{
              left: `${10 + i * 15}%`, animationDelay: `${i * 0.4}s`
            }}>{e}</span>
          ))}
        </div>
        <div className="container sp-hero-inner">
          <div className="sp-eyebrow"><span className="sp-dot" /> Professional Event Coverage</div>
          <h1 className="sp-title">
            Event Medical<br />
            <span className="sp-accent event-accent">Standby</span><br />
            Services
          </h1>
          <p className="sp-desc">
            Life Star EMS provides professional on-site EMT and paramedic crews for
            events of all sizes — from school sports to community festivals.
            We keep your attendees safe so you can focus on the event.
          </p>
          <div className="sp-actions">
            <a href="tel:9566606543" className="sp-btn-primary event-btn">
              <FaPhone /> Call (956) 660-6543
            </a>
            <div className="sp-free-badge event-free">📋 FREE Event Quote</div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="event-types-section">
        <div className="container">
          <span className="section-label">Events We Cover</span>
          <h2 className="section-title">Any Event.<br /><em>Any Size.</em></h2>
          <div className="event-types-grid">
            {eventTypes.map((t, i) => (
              <div className="event-type-card" key={i}>
                <span className="et-icon">{t.icon}</span>
                <h3>{t.label}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Clients */}
      <section className="event-clients">
        <div className="container">
          <span className="section-label">Trusted By</span>
          <h2 className="section-title">Our Community<br /><em>Partners</em></h2>
          <p className="section-sub">We are proud to have provided medical standby services for these organizations:</p>
          <div className="clients-grid">
            {clients.map((c, i) => (
              <div className="client-card" key={i}>
                <span className="client-icon">{c.icon}</span>
                <span className="client-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="sp-offer">
        <div className="container">
          <div className="sp-offer-grid">
            <div>
              <span className="section-label">What We Provide</span>
              <h2 className="section-title">Full On-Site<br /><em>Medical Coverage</em></h2>
              <ul className="sp-checklist">
                {[
                  'Certified EMT and Paramedic crews on standby',
                  'Fully equipped ambulance on site',
                  'Rapid response to any medical situation',
                  'AED, oxygen, and emergency equipment',
                  'Bilingual staff — English & Spanish',
                  'Coordinate with local EMS and hospitals',
                  'Post-event incident reports available',
                  'Flexible packages for any event size',
                ].map((item, i) => (
                  <li key={i}><FaCheckCircle className="check event-check" /> {item}</li>
                ))}
              </ul>
            </div>

            {/* Event Request Form */}
            <div className="sp-contact-box event-form-box">
              {status === 'sent' ? (
                <div className="ld-success">
                  <span>✅</span>
                  <h3>Request Received!</h3>
                  <p>We'll contact you within 24 hours with a custom quote for your event.</p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="ld-form-title">📋 Request Event Coverage</h3>
                  <div className="ld-form-row">
                    <div className="ld-form-group">
                      <label>Your Name *</label>
                      <input name="name" type="text" placeholder="John Doe" required value={form.name} onChange={handle} />
                    </div>
                    <div className="ld-form-group">
                      <label>Phone *</label>
                      <input name="phone" type="tel" placeholder="(956) 000-0000" required value={form.phone} onChange={handle} />
                    </div>
                  </div>
                  <div className="ld-form-group">
                    <label>Email *</label>
                    <input name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handle} />
                  </div>
                  <div className="ld-form-group">
                    <label>Event Name *</label>
                    <input name="event_name" type="text" placeholder="e.g. Annual Track Meet" required value={form.event_name} onChange={handle} />
                  </div>
                  <div className="ld-form-row">
                    <div className="ld-form-group">
                      <label>Event Date</label>
                      <input name="event_date" type="date" value={form.event_date} onChange={handle} />
                    </div>
                    <div className="ld-form-group">
                      <label>Expected Attendance</label>
                      <input name="attendance" type="text" placeholder="e.g. 500 people" value={form.attendance} onChange={handle} />
                    </div>
                  </div>
                  <div className="ld-form-group">
                    <label>Event Location</label>
                    <input name="event_location" type="text" placeholder="Address or venue name" value={form.event_location} onChange={handle} />
                  </div>
                  <div className="ld-form-group">
                    <label>Type of Event</label>
                    <select name="event_type" value={form.event_type} onChange={handle} style={{ background: 'var(--navy2)', border: '1px solid var(--border)', color: 'var(--white)', padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' }}>
                      <option value="">Select type...</option>
                      <option>School / CISD Event</option>
                      <option>Sports Tournament</option>
                      <option>Community Festival</option>
                      <option>Non-Profit Event</option>
                      <option>Corporate Event</option>
                      <option>City / Municipal Event</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="ld-form-group">
                    <label>Additional Notes</label>
                    <textarea name="notes" rows={3} placeholder="Any special requirements..." value={form.notes} onChange={handle} />
                  </div>
                  {status === 'error' && <p className="ld-error">Something went wrong. Please call us at (956) 660-6543.</p>}
                  <button type="submit" className="ld-submit event-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Request Free Quote →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta event-cta-section">
        <div className="container">
          <h2>Let's Cover Your Event</h2>
          <p>Call us for a free quote — we'll build a coverage plan around your event needs.</p>
          <a href="tel:9566606543" className="sp-btn-primary event-btn large">
            <FaPhone /> Call (956) 660-6543 Now
          </a>
        </div>
      </section>
    </div>
  )
}
