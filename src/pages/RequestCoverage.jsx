import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import './RequestCoverage.css'

const page = content.pages.request

export default function RequestCoverage() {
  const [form, setForm] = useState({ name:'', company:'', phone:'', email:'', service:'', date:'', location:'', details:'' })
  const [status, setStatus] = useState('idle')
  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const submit = async e => {
    e.preventDefault(); setStatus('sending')
    try {
      const message = `SERVICE: ${form.service} | Company: ${form.company} | Date: ${form.date} | Location: ${form.location} | Details: ${form.details}`
      const {error} = await supabase.from('contact_submissions').insert([{name:form.name,phone:form.phone,email:form.email,message,created_at:new Date().toISOString()}])
      if (error) throw error
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <InnerPage {...page} legacy>
    <div className="req-page">
      <section className="req-body">
        <div className="container">
          <div className="req-grid">
            {/* Form */}
            <div className="req-form-wrap">
              {status==='sent' ? (
                <div className="req-success" role="status">
                  <FaCheckCircle className="req-check" />
                  <h2>Request Submitted</h2>
                  <p>Our team will review the details and contact you to confirm availability. If anything is time sensitive, please call dispatch directly.</p>
                  <a href="tel:+19566606543" className="btn btn-blue"><FaPhone /> Call Dispatch</a>
                  <button className="btn btn-outline" onClick={()=>setStatus('idle')}>Submit Another Request</button>
                </div>
              ) : (
                <form onSubmit={submit} className="req-form">
                  <div className="req-form-row">
                    <div className="req-group"><label htmlFor="req-name">Full Name *</label><input id="req-name" name="name" type="text" autoComplete="name" placeholder="Your name" required value={form.name} onChange={handle}/></div>
                    <div className="req-group"><label htmlFor="req-company">Company / Organization</label><input id="req-company" name="company" type="text" autoComplete="organization" placeholder="School, clinic, event..." value={form.company} onChange={handle}/></div>
                  </div>
                  <div className="req-form-row">
                    <div className="req-group"><label htmlFor="req-phone">Phone Number *</label><input id="req-phone" name="phone" type="tel" autoComplete="tel" placeholder="(956) 000-0000" required value={form.phone} onChange={handle}/></div>
                    <div className="req-group"><label htmlFor="req-email">Email *</label><input id="req-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required value={form.email} onChange={handle}/></div>
                  </div>
                  <div className="req-group">
                    <label htmlFor="req-service">Type of Service *</label>
                    <select id="req-service" name="service" required value={form.service} onChange={handle} className="req-select">
                      <option value="">Select a service...</option>
                      <option>Dialysis Transport</option>
                      <option>Pediatric Therapy Transport</option>
                      <option>Pediatric / Long-Distance Transport</option>
                      <option>Event EMS Standby</option>
                    </select>
                  </div>
                  <div className="req-form-row">
                    <div className="req-group"><label htmlFor="req-date">Date Needed</label><input id="req-date" name="date" type="date" value={form.date} onChange={handle}/></div>
                    <div className="req-group"><label htmlFor="req-location">Location / City</label><input id="req-location" name="location" type="text" placeholder="Edinburg, McAllen..." value={form.location} onChange={handle}/></div>
                  </div>
                  <div className="req-group"><label htmlFor="req-details">Details *</label><textarea id="req-details" name="details" rows={5} placeholder="Please describe your transportation or standby needs..." required value={form.details} onChange={handle}/></div>
                  {status==='error'&&<p className="req-error" role="alert">Something went wrong. Please call us at (956) 660-6543.</p>}
                  <button type="submit" className="btn btn-blue req-submit" disabled={status==='sending'}>{status==='sending'?'Submitting…':'Submit Request →'}</button>
                  <p className="req-note">This form is for scheduled, non-emergency requests only. Submitting a request does not confirm scheduling; our team will contact you to confirm. For a medical emergency, call 911.</p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="req-sidebar">
              <div className="req-info-box">
                <h3>Contact Dispatch Directly</h3>
                <a href="tel:+19566606543" className="btn btn-blue req-call"><FaPhone /> (956) 660-6543</a>
                <p>For a medical emergency, call 911. Life Star EMS provides scheduled transportation and event standby services.</p>
              </div>

              <div className="req-info-box">
                <h3>Planning an Event?</h3>
                <p>{page.eventNote}</p>
                <Link to={page.eventHref} className="btn btn-outline req-event-link">{page.eventLinkLabel}</Link>
              </div>

              <div className="req-info-box">
                <h3>Government and Institutional Buyers</h3>
                <p>Agencies, districts, and prime contractors can review identifiers and download our capability statement.</p>
                <Link to="/government-contracting" className="btn btn-outline req-event-link">View Government Contracting</Link>
              </div>

              <div className="req-info-box">
                <h3>Services Available</h3>
                <ul className="req-svc-list">
                  {['Adult Dialysis Transportation','Pediatric Therapy Transportation','Pediatric & Long-Distance Transport','Event EMS Standby'].map((s,i)=>(<li key={i}><FaCheckCircle className="req-dot"/>{s}</li>))}
                </ul>
              </div>

              <div className="req-info-box">
                <h3>Service Area</h3>
                <p>Edinburg · McAllen · Mission · Pharr · Weslaco · Harlingen · Brownsville and surrounding communities.</p>
                <p style={{marginTop:'8px', color:'var(--v2-blue-ink)'}}>Long-distance trips available across Texas. Contact us to confirm availability for your location.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </InnerPage>
  )
}
