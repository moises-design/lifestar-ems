import { useState } from 'react'
import { FaPhone, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './ServicePage.css'
import './LongDistanceTransport.css'

const cities = [
  { name: 'Houston', miles: '~340 mi', icon: '🏙️' },
  { name: 'San Antonio', miles: '~250 mi', icon: '🌉' },
  { name: 'Corpus Christi', miles: '~165 mi', icon: '⚓' },
  { name: 'Dallas', miles: '~490 mi', icon: '🏢' },
  { name: 'Austin', miles: '~320 mi', icon: '🎸' },
  { name: 'Laredo', miles: '~155 mi', icon: '🌵' },
]

const needs = ['Wheelchair', 'Stretcher', 'Oxygen', 'IV Access', 'Special Equipment', 'Bariatric']

export default function LongDistanceTransport() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', pickup_city: 'McAllen/RGV',
    destination_city: '', travel_date: '', notes: '', patient_needs: [],
  })
  const [status, setStatus] = useState('idle')

  const handleCheck = (need) => {
    setForm(f => ({
      ...f,
      patient_needs: f.patient_needs.includes(need)
        ? f.patient_needs.filter(n => n !== need)
        : [...f.patient_needs, need]
    }))
  }

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const { error } = await supabase
        .from('long_distance_requests')
        .insert([{ ...form, patient_needs: form.patient_needs.join(', '), created_at: new Date().toISOString() }])
      if (error) throw error
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="service-page ld-page">
      <section className="sp-hero ld-hero">
        <div className="sp-hero-bg" />
        <div className="ld-map-bg" />
        <div className="container sp-hero-inner">
          <div className="sp-eyebrow"><span className="sp-dot" /> Statewide Medical Transport</div>
          <h1 className="sp-title">
            Long Distance<br />
            <span className="sp-accent">Medical Transport</span><br />
            Across Texas
          </h1>
          <p className="sp-desc">
            Need to reach a specialist in Houston or transfer to a hospital in San Antonio?
            Life Star EMS provides safe, monitored long-distance medical transport with
            certified BLS/ALS crews — anywhere in Texas.
          </p>
          <div className="sp-actions">
            <a href="tel:9566606543" className="sp-btn-primary"><FaPhone /> Call (956) 660-6543</a>
            <div className="sp-free-badge">🗺️ FREE Quote — No Obligation</div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="ld-cities">
        <div className="container">
          <span className="section-label">Where We Go</span>
          <h2 className="section-title">From RGV To<br /><em>All of Texas</em></h2>
          <div className="ld-cities-grid">
            {cities.map(c => (
              <div className="ld-city-card" key={c.name}>
                <span className="ld-city-icon">{c.icon}</span>
                <span className="ld-city-name">{c.name}</span>
                <span className="ld-city-miles">{c.miles}</span>
              </div>
            ))}
          </div>
          <div className="ld-anywhere">
            <FaMapMarkerAlt /> We transport to ANY city in Texas — just call us
          </div>
        </div>
      </section>

      {/* Quote Form + Info */}
      <section className="ld-quote-section">
        <div className="container">
          <div className="ld-quote-grid">
            <div>
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">Safe. Monitored.<br /><em>Professional.</em></h2>
              <ul className="sp-checklist">
                {[
                  'BLS / ALS certified crews on every trip',
                  'Continuous patient monitoring during transport',
                  'Wheelchair and stretcher accessible vehicles',
                  'Oxygen, IV, and special equipment available',
                  'Coordinated with receiving facility',
                  'Family member can ride along',
                  'Insurance accepted — we verify before trip',
                  'Available 24 hours / 7 days a week',
                ].map((item, i) => (
                  <li key={i}><FaCheckCircle className="check" /> {item}</li>
                ))}
              </ul>
            </div>

            {/* Quote Form */}
            <div className="ld-form-box">
              {status === 'sent' ? (
                <div className="ld-success">
                  <span>✅</span>
                  <h3>Request Received!</h3>
                  <p>We'll contact you within 2 hours to confirm your transport details.</p>
                  <a href="tel:9566606543" className="sp-btn-primary" style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    <FaPhone /> Call Now to Confirm
                  </a>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="ld-form-title">🗺️ Request a Free Quote</h3>
                  <div className="ld-form-row">
                    <div className="ld-form-group">
                      <label>Full Name *</label>
                      <input type="text" placeholder="John Doe" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                    </div>
                    <div className="ld-form-group">
                      <label>Phone *</label>
                      <input type="tel" placeholder="(956) 000-0000" required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                    </div>
                  </div>
                  <div className="ld-form-group">
                    <label>Email *</label>
                    <input type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                  </div>
                  <div className="ld-form-row">
                    <div className="ld-form-group">
                      <label>Pickup City</label>
                      <input type="text" value={form.pickup_city} onChange={e => setForm(f => ({...f, pickup_city: e.target.value}))} />
                    </div>
                    <div className="ld-form-group">
                      <label>Destination City *</label>
                      <input type="text" placeholder="Houston, Dallas..." required value={form.destination_city} onChange={e => setForm(f => ({...f, destination_city: e.target.value}))} />
                    </div>
                  </div>
                  <div className="ld-form-group">
                    <label>Travel Date</label>
                    <input type="date" value={form.travel_date} onChange={e => setForm(f => ({...f, travel_date: e.target.value}))} />
                  </div>
                  <div className="ld-form-group">
                    <label>Patient Needs (check all that apply)</label>
                    <div className="ld-needs-grid">
                      {needs.map(n => (
                        <label key={n} className="ld-need-check">
                          <input type="checkbox" checked={form.patient_needs.includes(n)} onChange={() => handleCheck(n)} />
                          <span>{n}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="ld-form-group">
                    <label>Additional Notes</label>
                    <textarea rows={3} placeholder="Any special requirements or information..." value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} />
                  </div>
                  {status === 'error' && <p className="ld-error">Something went wrong. Please call us directly at (956) 660-6543.</p>}
                  <button type="submit" className="ld-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Request Free Quote →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container">
          <h2>Need Transport Today?</h2>
          <p>Call us directly for immediate assistance with long distance medical transport.</p>
          <a href="tel:9566606543" className="sp-btn-primary large"><FaPhone /> Call (956) 660-6543 Now</a>
        </div>
      </section>
    </div>
  )
}
