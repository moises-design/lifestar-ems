import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './ServicePage.css'

const destinations = [
  'Therapy Centers',
  "Doctor's Appointments",
  'Specialist Visits',
  'Treatment Centers',
  'Rehabilitation Centers',
  'School Health Services',
]

const keyPoints = [
  { icon: '👶', title: 'All Ages Welcome', desc: 'We specialize in non-emergency transportation for children of all ages — infants to teens — with care tailored to each child.' },
  { icon: '🛡️', title: 'Safe & Comfortable', desc: 'Our vehicles are equipped with age-appropriate safety equipment to ensure every child arrives safely and comfortably.' },
  { icon: '💙', title: 'Caring Patient Staff', desc: 'Our team is trained to work with children, making every trip friendly, calm, and reassuring for patients and families alike.' },
  { icon: '🤝', title: 'Family Coordination', desc: 'We work closely with families and healthcare providers to coordinate transport around treatment schedules.' },
]

const insurances = [
  "Driscoll Children's Healthplan",
  'Healthspring',
  'Superior Healthplan',
  'Medicaid CSHCN',
  'United Healthcare',
  'Molina Healthcare',
]

export default function PediatricsTransport() {
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
        message: `[PEDIATRICS TRANSPORT] ${form.message}`,
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
          <div className="sp-hero-label">Pediatric Non-Emergency Transport</div>
          <h1>Pediatric Medical<br /><span>Transportation</span></h1>
          <p className="sp-hero-desc">
            Life Star EMS specializes in non-emergency medical transportation for children of all
            ages. Our friendly, trained staff provide safe and comfortable transport across
            the Rio Grande Valley — so parents can focus on what matters most.
          </p>
          <a href="tel:9566606543" className="sp-hero-cta">
            ⭐ FREE Evaluation — Call (956) 660-6543
          </a>
        </div>
      </section>

      {/* Destinations */}
      <section className="sp-destinations">
        <div className="container">
          <span className="section-label">We Transport Children To</span>
          <h2 className="section-title">Appointments &amp; <em>Treatment Centers</em></h2>
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
          <span className="section-label">Why Families Choose Life Star EMS</span>
          <h2 className="section-title">Safe, Caring Transport<br /><em>for Every Child</em></h2>
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
          <p>Let us help your child get to their appointments safely and comfortably.</p>
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
          <h2 className="section-title">Schedule Pediatric<br /><em>Transportation</em></h2>
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
                  <p>We'll contact you shortly to schedule your child's transport.</p>
                  <button className="sp-hero-cta" onClick={() => setStatus('idle')}>Submit Another</button>
                </div>
              ) : (
                <>
                  <h3>Request Transport</h3>
                  <form onSubmit={submit}>
                    <div className="sp-form-row">
                      <div className="sp-form-group">
                        <label>Parent / Guardian Name *</label>
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
                      <label>Child's Age, Destination &amp; Notes</label>
                      <textarea name="message" rows={4} placeholder="Child's age, facility name, appointment schedule, special needs..." value={form.message} onChange={handle} />
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
