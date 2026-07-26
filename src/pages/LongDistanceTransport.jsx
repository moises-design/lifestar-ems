import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import './ServicePage.css'
import './LongDistanceTransport.css'

const cities = [
  { name: 'Houston', miles: '~340 mi' },
  { name: 'San Antonio', miles: '~250 mi' },
  { name: 'Corpus Christi', miles: '~165 mi' },
  { name: 'Dallas', miles: '~490 mi' },
  { name: 'Austin', miles: '~320 mi' },
  { name: 'Laredo', miles: '~155 mi' },
]
const needs = ['Wheelchair', 'Stretcher', 'Oxygen', 'IV Access', 'Special Equipment', 'Bariatric']

export default function LongDistanceTransport() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', pickup_city: 'McAllen/RGV', destination_city: '', travel_date: '', notes: '', patient_needs: [] })
  const [status, setStatus] = useState('idle')

  const handleCheck = (need) => setForm(f => ({ ...f, patient_needs: f.patient_needs.includes(need) ? f.patient_needs.filter(n => n !== need) : [...f.patient_needs, need] }))
  const submit = async e => {
    e.preventDefault(); setStatus('sending')
    try {
      const { error } = await supabase.from('long_distance_requests').insert([{ ...form, patient_needs: form.patient_needs.join(', '), created_at: new Date().toISOString() }])
      if (error) throw error
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <InnerPage
      {...content.pages.longDistance}
      breadcrumb={[{ label: 'Services' }, { label: 'Long-distance medical transport' }]}
      legacy
      cta={
        <>
          <a href="#ld-form" className="v2-btn v2-btn-primary">Request a Free Quote</a>
          <a href="tel:+19566606543" className="v2-btn v2-btn-secondary">Call dispatch (956) 660-6543</a>
        </>
      }
    >
    <div className="sp ld-sp">

      <section className="ld-cities section">
        <div className="container">
          <span className="label">Where We Go</span>
          <h2 className="title">From RGV To<br /><em>All of Texas</em></h2>
          <div className="ld-cities-grid">
            {cities.map(c => (
              <div className="ld-city-card" key={c.name}>
                <span className="ld-city-name">{c.name}</span>
                <span className="ld-city-miles">{c.miles}</span>
              </div>
            ))}
          </div>
          <div className="ld-anywhere"><FaMapMarkerAlt aria-hidden="true" /> We transport to any city in Texas — just call us</div>
        </div>
      </section>

      <section className="sp-two" id="ld-form">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">Why Choose Us</span>
              <h2 className="title">Safe, Monitored<br /><em>Transport</em></h2>
              <ul className="sp-list">
                {['BLS-certified crews on every trip', 'Continuous patient monitoring during transport', 'Wheelchair and stretcher accessible vehicles', 'Oxygen, IV, and special equipment available', 'Coordinated with the receiving facility', 'Family member can ride along', 'Insurance accepted — verified before the trip', 'Available 24 hours a day, 7 days a week'].map((item, i) => (
                  <li key={i}><FaCheckCircle className="sp-list-check" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="sp-cta-box ld-form-box">
              {status === 'sent' ? (
                <div className="ld-success">
                  <FaCheckCircle className="ld-success-check" aria-hidden="true" />
                  <h3>Request Received!</h3>
                  <p>Our team will review your request and contact you to confirm your transport details. If anything is time sensitive, please call us directly.</p>
                  <a href="tel:+19566606543" className="btn btn-blue"><FaPhone /> Call Now to Confirm</a>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3>Request a Free Quote</h3>
                  <div className="ld-form-row">
                    <div className="ld-form-group"><label>Full Name *</label><input type="text" placeholder="John Doe" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} /></div>
                    <div className="ld-form-group"><label>Phone *</label><input type="tel" placeholder="(956) 000-0000" required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} /></div>
                  </div>
                  <div className="ld-form-group"><label>Email *</label><input type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} /></div>
                  <div className="ld-form-row">
                    <div className="ld-form-group"><label>Pickup City</label><input type="text" value={form.pickup_city} onChange={e => setForm(f => ({...f, pickup_city: e.target.value}))} /></div>
                    <div className="ld-form-group"><label>Destination *</label><input type="text" placeholder="Houston, Dallas..." required value={form.destination_city} onChange={e => setForm(f => ({...f, destination_city: e.target.value}))} /></div>
                  </div>
                  <div className="ld-form-group"><label>Travel Date</label><input type="date" value={form.travel_date} onChange={e => setForm(f => ({...f, travel_date: e.target.value}))} /></div>
                  <div className="ld-form-group">
                    <label>Patient Needs</label>
                    <div className="ld-needs-grid">{needs.map(n => (<label key={n} className="ld-need-check"><input type="checkbox" checked={form.patient_needs.includes(n)} onChange={() => handleCheck(n)} /><span>{n}</span></label>))}</div>
                  </div>
                  <div className="ld-form-group"><label>Additional Notes</label><textarea rows={3} placeholder="Any special requirements..." value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} /></div>
                  {status === 'error' && <p className="ld-error" role="alert">Something went wrong. Please call us at (956) 660-6543.</p>}
                  <button type="submit" className="btn btn-blue" style={{width:'100%',justifyContent:'center'}} disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Request Free Quote →'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta-banner">
        <div className="container">
          <h2>Need Transport Today?</h2>
          <p>Call us directly for immediate assistance with long-distance medical transport.</p>
          <a href="tel:+19566606543" className="btn btn-blue btn-lg"><FaPhone /> Call (956) 660-6543 Now</a>
          <Link to="/request" className="btn btn-outline btn-lg">Submit a Request</Link>
        </div>
      </section>

    </div>
    </InnerPage>
  )
}
