import { useState } from 'react'
import { FaPhone, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import { FormStatus, PrivacyNotice } from '../v2/components'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'', website:'' })
  const [status, setStatus] = useState('idle')
  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const submit = async e => {
    e.preventDefault()
    // Honeypot: real users never see or fill this field.
    if (form.website) return
    setStatus('sending')
    try {
      const { website: _website, ...submission } = form
      const {error} = await supabase.from('contact_submissions').insert([{...submission, created_at: new Date().toISOString()}])
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
              {/* Email, street address, and office hours withheld until the
                  owner verifies them (docs/SEO-FACT-VERIFICATION.md §3-5). */}
              {[
                { icon: <FaPhone />, label: 'Dispatch Line', val: '(956) 660-6543', href: 'tel:+19566606543' },
                { icon: <FaMapMarkerAlt />, label: 'Service Region', val: 'Rio Grande Valley, based in Edinburg, Texas' },
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
                <FormStatus state="success" title="Message Received!">
                  Our team will review your message and follow up with you.
                </FormStatus>
                <button className="btn btn-blue" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <h3 className="form-title">Send a Message</h3>
                <div className="fg-row">
                  <div className="fg"><label htmlFor="ct-name">Full Name *</label><input id="ct-name" name="name" type="text" autoComplete="name" placeholder="Your name" required value={form.name} onChange={handle}/></div>
                  <div className="fg"><label htmlFor="ct-phone">Phone</label><input id="ct-phone" name="phone" type="tel" autoComplete="tel" placeholder="(956) 000-0000" value={form.phone} onChange={handle}/></div>
                </div>
                <div className="fg"><label htmlFor="ct-email">Email *</label><input id="ct-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required value={form.email} onChange={handle}/></div>
                <div className="fg"><label htmlFor="ct-message">Message *</label><textarea id="ct-message" name="message" rows={5} placeholder="How can we help?" required value={form.message} onChange={handle}/></div>
                <div className="v2-visually-hidden" aria-hidden="true">
                  <label htmlFor="ct-website">Leave this field blank</label>
                  <input id="ct-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handle} />
                </div>
                <PrivacyNotice sensitive className="contact-privacy-notice" />
                {status==='error' && (
                  <FormStatus state="error" title="Something went wrong.">
                    Please call us at (956) 660-6543.
                  </FormStatus>
                )}
                <button type="submit" className="btn btn-blue form-submit-btn" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send Message →'}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
