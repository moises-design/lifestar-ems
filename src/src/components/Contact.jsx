import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' })
  const [status, setStatus] = useState('idle')
  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const submit = async e => {
    e.preventDefault(); setStatus('sending')
    try {
      const {error} = await supabase.from('contact_submissions').insert([{...form, created_at: new Date().toISOString()}])
      if (error) throw error
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-left">
            <span className="label">Get In Touch</span>
            <h2 className="title">Contact<br /><em>Life Star EMS</em></h2>

            <div className="contact-details">
              {[
                { icon: <FaPhone />, label: 'Dispatch Line', val: '(956) 660-6543', href: 'tel:9566606543' },
                { icon: <FaEnvelope />, label: 'Email', val: 'lifestarems.rgv@gmail.com', href: 'mailto:lifestarems.rgv@gmail.com' },
                { icon: <FaMapMarkerAlt />, label: 'Address', val: '2526 W. Freddy Gonzalez, Edinburg TX 78539' },
                { icon: <FaClock />, label: 'Dispatch Hours', val: '24 Hours / 7 Days a Week' },
              ].map((item, i) => (
                <div key={i} className="contact-detail">
                  <div className="cd-icon">{item.icon}</div>
                  <div>
                    <div className="cd-label">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="cd-val">{item.val}</a>
                      : <div className="cd-val">{item.val}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-socials">
              <a href="https://www.facebook.com/LifeStarEMSRGV/" target="_blank" rel="noreferrer" className="social-pill fb">
                <FaFacebook /> Facebook Page
              </a>
            </div>

            <div className="contact-request-box">
              <p>Need transport or event coverage? Fill out our full request form:</p>
              <Link to="/request" className="btn btn-blue">Request Transport →</Link>
            </div>
          </div>

          <div className="contact-form-col">
            {status === 'sent' ? (
              <div className="form-done">
                <span>✅</span>
                <h3>Message Received!</h3>
                <p>We'll contact you shortly.</p>
                <button className="btn btn-blue" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <h3 className="form-title">Send a Message</h3>
                <div className="fg-row">
                  <div className="fg"><label>Full Name *</label><input name="name" type="text" placeholder="John Doe" required value={form.name} onChange={handle}/></div>
                  <div className="fg"><label>Phone</label><input name="phone" type="tel" placeholder="(956) 000-0000" value={form.phone} onChange={handle}/></div>
                </div>
                <div className="fg"><label>Email *</label><input name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handle}/></div>
                <div className="fg"><label>Message *</label><textarea name="message" rows={5} placeholder="How can we help?" required value={form.message} onChange={handle}/></div>
                {status==='error' && <p className="form-err">Something went wrong. Please call us directly.</p>}
                <button type="submit" className="btn btn-blue form-submit-btn" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send Message →'}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
