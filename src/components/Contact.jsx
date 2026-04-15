import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaGoogle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: form.name,
          phone: form.phone || null,
          email: form.email,
          message: form.message,
          created_at: new Date().toISOString(),
        }])
      if (error) throw error
      setStatus('sent')
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (err) {
      console.error('Supabase error:', err)
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Contact<br /><em>Life Star EMS</em>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon"><FaPhone /></div>
              <div>
                <div className="info-label">Phone</div>
                <a href="tel:9566606543" className="info-value">(956) 660-6543</a>
                <div className="info-sub">Non-emergency dispatch</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaEnvelope /></div>
              <div>
                <div className="info-label">Email</div>
                <a href="mailto:lifestarems.rgv@gmail.com" className="info-value">lifestarems.rgv@gmail.com</a>
                <div className="info-sub">Billing &amp; general inquiries</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaMapMarkerAlt /></div>
              <div>
                <div className="info-label">Address</div>
                <div className="info-value">2526 W. Freddy Gonzalez</div>
                <div className="info-sub">Edinburg, TX 78539</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaClock /></div>
              <div>
                <div className="info-label">Availability</div>
                <div className="info-value">24 Hours / 7 Days</div>
                <div className="info-sub">Always available for emergencies</div>
              </div>
            </div>
            <div className="social-links">
              <a href="https://www.facebook.com/LifeStarEMSRGV/" target="_blank" rel="noreferrer" className="social-link">
                <FaFacebook /> Facebook
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="social-link">
                <FaGoogle /> Google
              </a>
            </div>
          </div>

          <div className="contact-form-wrap">
            {status === 'sent' ? (
              <div className="form-success">
                <span>✅</span>
                <h3>Message Received!</h3>
                <p>We'll get back to you shortly. For emergencies, always call 911.</p>
                <button className="btn-submit" style={{ marginTop: 16 }} onClick={() => setStatus('idle')}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <h3 className="form-title">Send Us a Message</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handle} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="(956) 000-0000" value={form.phone} onChange={handle} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" rows={5} placeholder="How can we help you?" value={form.message} onChange={handle} required />
                </div>
                {status === 'error' && (
                  <p className="form-error">⚠️ Something went wrong. Please call us directly at (956) 660-6543.</p>
                )}
                <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
                <p className="form-note">
                  🚨 For medical emergencies, <strong>call 911 immediately</strong>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
