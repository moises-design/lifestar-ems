import { useState } from 'react'
import { FaPhone, FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './RequestCoverage.css'

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
    <div className="req-page">
      <section className="req-hero">
        <div className="req-hero-bg" />
        <div className="container req-hero-inner">
          <span className="label">Get Started</span>
          <h1 className="req-h1">Request<br /><span className="req-accent">EMS Coverage</span></h1>
          <p className="req-lead">Fill out the form below and our team will contact you within 2 hours to confirm your transport or EMS coverage needs.</p>
        </div>
      </section>

      <section className="req-body">
        <div className="container">
          <div className="req-grid">
            {/* Form */}
            <div className="req-form-wrap">
              {status==='sent' ? (
                <div className="req-success">
                  <FaCheckCircle className="req-check" />
                  <h2>Request Submitted!</h2>
                  <p>We'll contact you within 2 hours to confirm details. For urgent needs, call us directly.</p>
                  <a href="tel:9566606543" className="btn btn-blue"><FaPhone /> Call Dispatch Now</a>
                  <button className="btn btn-outline" onClick={()=>setStatus('idle')}>Submit Another Request</button>
                </div>
              ) : (
                <form onSubmit={submit} className="req-form">
                  <div className="req-form-row">
                    <div className="req-group"><label>Full Name *</label><input name="name" type="text" placeholder="John Doe" required value={form.name} onChange={handle}/></div>
                    <div className="req-group"><label>Company / Organization</label><input name="company" type="text" placeholder="School, clinic, event..." value={form.company} onChange={handle}/></div>
                  </div>
                  <div className="req-form-row">
                    <div className="req-group"><label>Phone Number *</label><input name="phone" type="tel" placeholder="(956) 000-0000" required value={form.phone} onChange={handle}/></div>
                    <div className="req-group"><label>Email *</label><input name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handle}/></div>
                  </div>
                  <div className="req-group">
                    <label>Type of Service *</label>
                    <select name="service" required value={form.service} onChange={handle} className="req-select">
                      <option value="">Select a service...</option>
                      <option>Dialysis Transport</option>
                      <option>Pediatric Therapy Transport</option>
                      <option>Pediatric / Long-Distance Transport</option>
                      <option>Event EMS Standby</option>
                    </select>
                  </div>
                  <div className="req-form-row">
                    <div className="req-group"><label>Date Needed</label><input name="date" type="date" value={form.date} onChange={handle}/></div>
                    <div className="req-group"><label>Location / City</label><input name="location" type="text" placeholder="Edinburg, McAllen..." value={form.location} onChange={handle}/></div>
                  </div>
                  <div className="req-group"><label>Details *</label><textarea name="details" rows={5} placeholder="Please describe your transportation or EMS coverage needs in detail..." required value={form.details} onChange={handle}/></div>
                  {status==='error'&&<p className="req-error">Something went wrong. Please call us at (956) 660-6543.</p>}
                  <button type="submit" className="btn btn-blue req-submit" disabled={status==='sending'}>{status==='sending'?'Submitting…':'Submit Request →'}</button>
                  <p className="req-note">This form is for non-emergency scheduling only. For urgent needs, please call us directly.</p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="req-sidebar">
              <div className="req-info-box">
                <h3>Contact Dispatch Directly</h3>
                <a href="tel:9566606543" className="btn btn-blue req-call"><FaPhone /> (956) 660-6543</a>
                <p>Available Scheduled for emergencies and scheduling</p>
              </div>

              <div className="req-info-box">
                <h3>Services Available</h3>
                <ul className="req-svc-list">
                  {['Adult Dialysis Transportation','Pediatric Therapy Transportation','Pediatric & Long-Distance Transport','Event EMS Standby'].map((s,i)=>(<li key={i}><FaCheckCircle className="req-dot"/>{s}</li>))}
                </ul>
              </div>

              <div className="req-info-box">
                <h3>Service Area</h3>
                <p>Edinburg · McAllen · Mission · Pharr · Weslaco · Harlingen · Brownsville and all surrounding areas.</p>
                <p style={{marginTop:'8px', color:'var(--blue-light)'}}>Long-distance transport available statewide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
