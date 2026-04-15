import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './ServicePage.css'

const destinations = [
  'Physical Therapy',
  'Wound Care',
  'Hyperbaric Medicine',
  'Cancer Treatments',
  'Hospital Admissions',
  "Doctor's Appointments",
]

const keyPoints = [
  { icon: '🤝', title: 'Coordinated Care', desc: 'We coordinate directly with your healthcare providers to ensure timely arrivals and smooth transitions between facilities.' },
  { icon: '📅', title: 'Flexible Scheduling', desc: 'Appointments at any time of day — we work around your treatment schedule, not the other way around.' },
  { icon: '🛡️', title: 'Professional Staff', desc: 'Certified EMT and Paramedic crews provide safe, monitored transport to every appointment.' },
  { icon: '💙', title: 'Compassionate Care', desc: 'We treat every patient with dignity, patience, and the care they deserve on every single trip.' },
]

const insurances = [
  'BlueCross BlueShield', 'Molina Healthcare', 'Ambetter',
  'United Healthcare', 'Cigna', 'Humana',
  'Wellcare / Allwell', 'Aetna', 'Medicare', 'Medicaid',
]

export default function TherapyTransport() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const { error } = await supabase.from('contact_submissions').insert([{
        name: form.name,
        phone: form.phone || null,
        email: form.email,
        message: `[THERAPY TRANSPORT] ${form.message}`,
        created_at: new Date().toISOString(),
      }])
      if (error) throw error
      setStatus('sent')
      setForm({ name: '', phone: '', email: '', message: '' })
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
          <div className="sp-hero-label">Specialty Medical Transport</div>
          <h1>Therapy &amp; <span>Specialty</span><br />Transportation</h1>
          <p className="sp-hero-desc">
            Life Star EMS transports patients to a wide range of therapy and specialty medical
            appointments across the Rio Grande Valley. Professional, punctual, and compassionate
            care from door to door.
          </p>
          <a href="tel:9566606543" className="sp-hero-cta">
            ⭐ FREE Evaluation — Call (956) 660-6543
          </a>
        </div>
      </section>

      {/* Destinations */}
      <section className="sp-destinations">
        <div className="container">
          <span className="section-label">We Transport Patients To</span>
          <h2 className="section-title">Specialty <em>Appointments &amp; Treatments</em></h2>
          <div className="sp-dest-grid">
            {destinations.map(d => (
              <div key={d} className="sp-dest-card">🏥 {d}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="sp-points">
        <div className="container">
          <span className="section-label">Why Choose Life Star EMS</span>
          <h2 className="section-title">Professional Care,<br /><em>Every Appointment</em></h2>
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
          <h2>Get Your <span style={{ color: '#FFC107' }}>FREE</span> Evaluation Today</h2>
          <p>Tell us about your therapy transport needs and we'll get you scheduled.</p>
          <a href="tel:9566606543" className="sp-hero-cta">📞 Call (956) 660-6543</a>
        </div>
      </div>

      {/* Insurance */}
      <section className="sp-insurance">
        <div className="container">
          <span className="section-label">Coverage &amp; Billing</span>
          <h2 className="section-title">Insurance <em>We Accept</em></h2>
          <div className="sp-insurance-grid">
            {insurances.map(ins => (
              <div key={ins} className="sp-ins-badge">{ins}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="sp-contact">
        <div className="container">
          <span className="section-label">Request Transport</span>
          <h2 className="section-title">Schedule Your<br /><em>Therapy Transport</em></h2>
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
                  <p>We'll reach out shortly to confirm your transport appointment.</p>
                  <button className="sp-hero-cta" onClick={() => setStatus('idle')}>Submit Another</button>
                </div>
              ) : (
                <>
                  <h3>Request Transport</h3>
                  <form onSubmit={submit}>
                    <div className="sp-form-row">
                      <div className="sp-form-group">
                        <label>Full Name *</label>
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
                    <div className="sp-form-group">
                      <label>Appointment Type &amp; Notes</label>
                      <textarea name="message" rows={4} placeholder="Type of therapy, facility name, schedule, special needs..." value={form.message} onChange={handle} />
                    </div>
                    {status === 'error' && <p className="sp-form-error">⚠️ Something went wrong. Please call (956) 660-6543 directly.</p>}
                    <button type="submit" className="sp-hero-cta sp-form-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Submit Transport Request →'}
                    </button>
                    <p className="sp-form-note">🚨 For medical emergencies, call 911 immediately.</p>
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
