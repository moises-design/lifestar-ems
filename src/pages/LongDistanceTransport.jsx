import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './ServicePage.css'

const destinations = [
  'Houston', 'San Antonio', 'Corpus Christi',
  'Dallas', 'Austin', 'Laredo',
  'Anywhere in Texas', 'Out-of-State Transfers',
]

const keyPoints = [
  { icon: '🚑', title: 'BLS / ALS Certified Crews', desc: 'All long-distance transports are staffed by certified Basic Life Support or Advanced Life Support crews, providing continuous medical monitoring.' },
  { icon: '🗺️', title: 'Statewide Coverage', desc: 'We transport patients anywhere in Texas — from the Rio Grande Valley to Houston, Dallas, San Antonio, and beyond.' },
  { icon: '🏥', title: 'Hospital Transfers', desc: 'Interfacility transfers between hospitals, skilled nursing facilities, and rehab centers handled professionally and safely.' },
  { icon: '👨‍👩‍👧', title: 'Family Relocations', desc: 'Relocating a family member to be closer to loved ones? We provide safe, comfortable long-distance medical transport.' },
]

const patientNeedsOptions = [
  'Wheelchair', 'Stretcher', 'Oxygen', 'IV', 'Special Equipment',
]

export default function LongDistanceTransport() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    pickup_city: '', destination_city: '',
    travel_date: '', patient_needs: [], notes: '',
  })
  const [status, setStatus] = useState('idle')

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleNeeds = e => {
    const val = e.target.value
    const needs = form.patient_needs.includes(val)
      ? form.patient_needs.filter(n => n !== val)
      : [...form.patient_needs, val]
    setForm({ ...form, patient_needs: needs })
  }

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const { error } = await supabase.from('long_distance_requests').insert([{
        name: form.name,
        phone: form.phone || null,
        email: form.email,
        pickup_city: form.pickup_city,
        destination_city: form.destination_city,
        travel_date: form.travel_date || null,
        patient_needs: form.patient_needs.join(', '),
        notes: form.notes,
        created_at: new Date().toISOString(),
      }])
      if (error) throw error
      setStatus('sent')
      setForm({ name: '', phone: '', email: '', pickup_city: '', destination_city: '', travel_date: '', patient_needs: [], notes: '' })
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
          <div className="sp-hero-label">Statewide Medical Transport</div>
          <h1>Long Distance Transport<br /><span>Across Texas</span></h1>
          <p className="sp-hero-desc">
            Life Star EMS transports patients from the Rio Grande Valley to Houston,
            San Antonio, Dallas, Austin, Corpus Christi, Laredo — and anywhere in Texas.
            Professional, monitored transport with BLS/ALS certified crews every mile.
          </p>
          <a href="tel:9566606543" className="sp-hero-cta">
            📞 Call (956) 660-6543 for a Quote
          </a>
        </div>
      </section>

      {/* Destinations */}
      <section className="sp-destinations">
        <div className="container">
          <span className="section-label">Where We Travel</span>
          <h2 className="section-title">Destinations <em>Across Texas</em></h2>
          <div className="sp-dest-grid">
            {destinations.map(d => (
              <div key={d} className="sp-dest-card">📍 {d}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="sp-points">
        <div className="container">
          <span className="section-label">Why Choose Life Star EMS</span>
          <h2 className="section-title">Safe Transport,<br /><em>Any Distance</em></h2>
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
          <h2>Get a <span style={{ color: '#FFC107' }}>FREE</span> Quote Today</h2>
          <p>Tell us your origin, destination, and patient needs — we'll get you a quote fast.</p>
          <a href="tel:9566606543" className="sp-hero-cta">📞 Call (956) 660-6543</a>
        </div>
      </div>

      {/* Quote Form */}
      <section className="sp-contact">
        <div className="container">
          <span className="section-label">Request a Quote</span>
          <h2 className="section-title">Long Distance<br /><em>Transport Request</em></h2>
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
                  <h3>Quote Request Received!</h3>
                  <p>We'll contact you shortly with pricing and availability for your transport.</p>
                  <button className="sp-hero-cta" onClick={() => setStatus('idle')}>Submit Another</button>
                </div>
              ) : (
                <>
                  <h3>Request a Free Quote</h3>
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
                    <div className="sp-form-row">
                      <div className="sp-form-group">
                        <label>Pickup City *</label>
                        <input type="text" name="pickup_city" placeholder="e.g. McAllen, TX" value={form.pickup_city} onChange={handle} required />
                      </div>
                      <div className="sp-form-group">
                        <label>Destination City *</label>
                        <input type="text" name="destination_city" placeholder="e.g. Houston, TX" value={form.destination_city} onChange={handle} required />
                      </div>
                    </div>
                    <div className="sp-form-group">
                      <label>Preferred Travel Date</label>
                      <input type="date" name="travel_date" value={form.travel_date} onChange={handle} />
                    </div>
                    <div className="sp-form-group">
                      <label>Patient Needs (select all that apply)</label>
                      <div className="sp-checkboxes">
                        {patientNeedsOptions.map(opt => (
                          <label key={opt} className="sp-checkbox-label">
                            <input
                              type="checkbox"
                              value={opt}
                              checked={form.patient_needs.includes(opt)}
                              onChange={handleNeeds}
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="sp-form-group">
                      <label>Additional Notes</label>
                      <textarea name="notes" rows={3} placeholder="Medical condition, special requirements, urgency..." value={form.notes} onChange={handle} />
                    </div>
                    {status === 'error' && <p className="sp-form-error">⚠️ Something went wrong. Please call (956) 660-6543 directly.</p>}
                    <button type="submit" className="sp-hero-cta sp-form-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Get My Free Quote →'}
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
