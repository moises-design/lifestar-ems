import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './ServicePage.css'

const eventTypes = [
  'Schools', 'City Events', 'Community Events',
  'Sports Events', 'Concerts', 'Festivals',
  'Corporate Events', 'Private Events',
]

const keyPoints = [
  { icon: '🚑', title: 'Certified EMT / Paramedic Crews', desc: 'Every event standby deployment is staffed with fully certified EMTs and Paramedics — prepared for any medical situation.' },
  { icon: '🚒', title: 'Fully Equipped Ambulances', desc: 'Our units arrive stocked with ALS/BLS equipment, ready to respond immediately on-site without waiting for dispatch.' },
  { icon: '⚡', title: 'Rapid On-Site Response', desc: 'With crews stationed at your event, response time is seconds — not minutes — significantly improving outcomes.' },
  { icon: '📋', title: 'Event Planning Support', desc: 'We work with your event coordinators to assess coverage needs and position crews for maximum coverage.' },
]

export default function EventStandby() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    event_name: '', event_date: '', event_location: '',
    expected_attendance: '', event_type: '', message: '',
  })
  const [status, setStatus] = useState('idle')

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    const details = `[EVENT STANDBY] Event: ${form.event_name} | Date: ${form.event_date} | Location: ${form.event_location} | Attendance: ${form.expected_attendance} | Type: ${form.event_type} | Notes: ${form.message}`
    try {
      const { error } = await supabase.from('contact_submissions').insert([{
        name: form.name,
        phone: form.phone || null,
        email: form.email,
        message: details,
        created_at: new Date().toISOString(),
      }])
      if (error) throw error
      setStatus('sent')
      setForm({ name: '', phone: '', email: '', event_name: '', event_date: '', event_location: '', expected_attendance: '', event_type: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main className="service-page">
      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-inner container">
          <div className="sp-hero-label">Professional Event Medical Coverage</div>
          <h1>Event Medical<br /><span>Standby Services</span></h1>
          <p className="sp-hero-desc">
            Life Star EMS provides professional EMT and Paramedic crews on standby for events
            across the Rio Grande Valley. From school functions to large concerts — we keep
            your attendees safe so you can focus on a great event.
          </p>
          <a href="tel:9566606543" className="sp-hero-cta">
            📞 Call (956) 660-6543 for a Free Quote
          </a>
        </div>
      </section>

      {/* Event Types */}
      <section className="sp-destinations">
        <div className="container">
          <span className="section-label">Events We Cover</span>
          <h2 className="section-title">We Serve <em>All Event Types</em></h2>
          <div className="sp-dest-grid">
            {eventTypes.map(e => (
              <div key={e} className="sp-dest-card">🎪 {e}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="sp-points">
        <div className="container">
          <span className="section-label">What We Provide</span>
          <h2 className="section-title">Professional Standby,<br /><em>Every Event</em></h2>
          <div className="sp-points-grid">
            {keyPoints.map(p => (
              <div key={p.title} className="sp-point-card">
                <div className="sp-point-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="sp-cta-banner">
        <div className="container">
          <h2>Get a <span style={{ color: '#FFC107' }}>FREE</span> Event Quote</h2>
          <p>Tell us about your event and we'll provide a coverage plan and pricing.</p>
          <a href="tel:9566606543" className="sp-hero-cta">📞 Call (956) 660-6543</a>
        </div>
      </div>

      {/* Event Request Form */}
      <section className="sp-contact">
        <div className="container">
          <span className="section-label">Request Coverage</span>
          <h2 className="section-title">Event Standby<br /><em>Request Form</em></h2>
          <div className="sp-contact-grid">
            <div className="sp-contact-info">
              <h3>Contact Us</h3>
              <div className="sp-info-item">
                <div className="sp-info-icon"><FaPhone /></div>
                <div>
                  <div className="sp-info-label">Phone</div>
                  <div className="sp-info-value"><a href="tel:9566606543">(956) 660-6543</a></div>
                </div>
              </div>
              <div className="sp-info-item">
                <div className="sp-info-icon"><FaEnvelope /></div>
                <div>
                  <div className="sp-info-label">Email</div>
                  <div className="sp-info-value"><a href="mailto:lifestarems.rgv@gmail.com">lifestarems.rgv@gmail.com</a></div>
                </div>
              </div>
              <div className="sp-info-item">
                <div className="sp-info-icon"><FaMapMarkerAlt /></div>
                <div>
                  <div className="sp-info-label">Address</div>
                  <div className="sp-info-value">2526 W. Freddy Gonzalez<br />Edinburg, TX 78539</div>
                </div>
              </div>
            </div>

            <div className="sp-form">
              {status === 'sent' ? (
                <div className="sp-form-success">
                  <FaCheckCircle className="sp-success-icon" />
                  <h3>Request Received!</h3>
                  <p>We'll reach out shortly with a coverage plan and quote for your event.</p>
                  <button className="sp-hero-cta" onClick={() => setStatus('idle')}>Submit Another</button>
                </div>
              ) : (
                <>
                  <h3>Event Standby Request</h3>
                  <form onSubmit={submit}>
                    <div className="sp-form-row">
                      <div className="sp-form-group">
                        <label>Contact Name *</label>
                        <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handle} required />
                      </div>
                      <div className="sp-form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" placeholder="(956) 000-0000" value={form.phone} onChange={handle} />
                      </div>
                    </div>
                    <div className="sp-form-group">
                      <label>Email *</label>
                      <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                    </div>
                    <div className="sp-form-row">
                      <div className="sp-form-group">
                        <label>Event Name *</label>
                        <input type="text" name="event_name" placeholder="Annual 5K Run" value={form.event_name} onChange={handle} required />
                      </div>
                      <div className="sp-form-group">
                        <label>Event Date *</label>
                        <input type="date" name="event_date" value={form.event_date} onChange={handle} required />
                      </div>
                    </div>
                    <div className="sp-form-group">
                      <label>Event Location *</label>
                      <input type="text" name="event_location" placeholder="123 Main St, McAllen, TX" value={form.event_location} onChange={handle} required />
                    </div>
                    <div className="sp-form-row">
                      <div className="sp-form-group">
                        <label>Expected Attendance</label>
                        <input type="text" name="expected_attendance" placeholder="e.g. 500" value={form.expected_attendance} onChange={handle} />
                      </div>
                      <div className="sp-form-group">
                        <label>Type of Event</label>
                        <select name="event_type" value={form.event_type} onChange={handle}>
                          <option value="">Select type...</option>
                          <option>School Event</option>
                          <option>City / Government Event</option>
                          <option>Sports Event</option>
                          <option>Concert / Festival</option>
                          <option>Corporate Event</option>
                          <option>Community Event</option>
                          <option>Private Event</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="sp-form-group">
                      <label>Additional Details</label>
                      <textarea name="message" rows={3} placeholder="Event description, hours of coverage needed, special considerations..." value={form.message} onChange={handle} />
                    </div>
                    {status === 'error' && <p className="sp-form-error">⚠️ Something went wrong. Please call (956) 660-6543 directly.</p>}
                    <button type="submit" className="sp-hero-cta sp-form-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Submit Event Request →'}
                    </button>
                    <p className="sp-form-note">🚨 For active medical emergencies at your event, call 911 immediately.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
