import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaGoogle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' })
  const [status, setStatus] = useState('idle')
  const handle = e => setForm(f => ({...f, [e.target.name]: e.target.value}))

  const submit = async e => {
    e.preventDefault(); setStatus('sending')
    try {
      const { error } = await supabase.from('contact_submissions').insert([{...form, created_at: new Date().toISOString()}])
      if (error) throw error
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="label">Get In Touch</span>
            <h2 className="title">Contact<br /><em>Life Star EMS</em></h2>

            <div className="info-items">
              {[
                { icon: <FaPhone />, label: 'Dispatch', val: '(956) 660-6543', href: 'tel:9566606543' },
                { icon: <FaEnvelope />, label: 'Email', val: 'lifestarems.rgv@gmail.com', href: 'mailto:lifestarems.rgv@gmail.com' },
                { icon: <FaMapMarkerAlt />, label: 'Address', val: '2526 W. Freddy Gonzalez, Edinburg TX 78539' },
                { icon: <FaClock />, label: 'Hours', val: '24 Hours / 7 Days a Week' },
              ].map((item, i) => (
                <div key={i} className="info-item">
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <div className="info-lbl">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="info-val">{item.val}</a>
                      : <div className="info-val">{item.val}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="social-row">
              <a href="https://www.facebook.com/LifeStarEMSRGV/" target="_blank" rel="noreferrer" className="social-btn fb"><FaFacebook /> Facebook</a>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="social-btn g"><FaGoogle /> Google</a>
            </div>

            <div className="emergency-box">
              <div className="emg-label">🚨 Medical Emergency?</div>
              <a href="tel:911" className="btn btn-red emg-btn">Call 911 Immediately</a>
            </div>
          </div>

          <div className="contact-form-wrap">
            {status === 'sent' ? (
              <div className="form-success">
                <span>✅</span>
                <h3>Message Received!</h3>
                <p>We'll contact you shortly. For emergencies, call 911.</p>
                <button className="btn btn-blue" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <h3 className="form-title">Send Us a Message</h3>
                <div className="form-row">
                  <div className="form-group"><label>Full Name *</label><input name="name" type="text" placeholder="John Doe" required value={form.name} onChange={handle} /></div>
                  <div className="form-group"><label>Phone</label><input name="phone" type="tel" placeholder="(956) 000-0000" value={form.phone} onChange={handle} /></div>
                </div>
                <div className="form-group"><label>Email *</label><input name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handle} /></div>
                <div className="form-group"><label>Message *</label><textarea name="message" rows={5} placeholder="How can we help you?" required value={form.message} onChange={handle} /></div>
                {status === 'error' && <p className="form-error">Something went wrong. Please call us directly.</p>}
                <button type="submit" className="btn btn-blue form-submit" disabled={status==='sending'}>{status==='sending' ? 'Sending…' : 'Send Message →'}</button>
                <p className="form-note">🚨 For emergencies, <strong>call 911 immediately</strong></p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
