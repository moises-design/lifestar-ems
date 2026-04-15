import { Link } from 'react-router-dom'
import { FaPhone } from 'react-icons/fa'
import './ServicePage.css'
import './DialysisTransport.css'

const feats = [
  { icon:'🕐', title:'Always On Time', desc:'Dialysis has strict schedules. Our drivers arrive early — every single appointment.' },
  { icon:'🤝', title:'Compassionate Care', desc:'We treat every patient with dignity, patience, and genuine respect.' },
  { icon:'📅', title:'Flexible Scheduling', desc:'We coordinate directly with your dialysis center to match your treatment schedule.' },
  { icon:'🏥', title:'Provider Coordination', desc:'Direct communication with your healthcare team for seamless transport.' },
]

export default function DialysisTransport() {
  return (
    <div className="sp dialysis-sp">
      <section className="sp-hero dialysis-hero">
        <div className="sp-hero-bg dialysis-bg" />
        <div className="container sp-inner">
          <div className="sp-badge"><span className="sp-dot" /> Adult Dialysis Transportation</div>
          <h1 className="sp-h1">Reliable Dialysis<br /><span className="sp-accent">Transport Specialists</span></h1>
          <p className="sp-lead">Dialysis patients need consistent, dependable transport — three times a week, every week. Life Star EMS is your trusted partner for on-time, compassionate dialysis transportation across the Rio Grande Valley.</p>
          <div className="sp-btns">
            <Link to="/request" className="btn btn-blue">Request Transport</Link>
            <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> (956) 660-6543</a>
          </div>
        </div>
      </section>

      <section className="sp-features">
        <div className="container">
          <span className="label">Why Families Trust Us</span>
          <h2 className="title">Built Around<br /><em>Your Schedule</em></h2>
          <div className="sp-feat-grid">
            {feats.map((f,i) => <div key={i} className="sp-feat"><div className="sp-feat-icon">{f.icon}</div><h3>{f.title}</h3><p>{f.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section className="sp-two">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">Our Promise</span>
              <h2 className="title">Punctual.<br /><em>Professional. Caring.</em></h2>
              <ul className="sp-list">
                {['Door-to-door pickup and drop-off','Wheelchair and stretcher accessible vehicles','Trained and friendly EMT staff','Coordinated with your dialysis center','Consistent, familiar drivers you recognize','Available 7 days a week','Bilingual staff — English & Spanish','Insurance verified before your first trip'].map((item,i) => (
                  <li key={i}><span className="sp-list-dot" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="sp-cta-box">
              <h3>Free Evaluation</h3>
              <p>We'll verify your insurance and set up your transport schedule at no cost to you.</p>
              <Link to="/request" className="btn btn-blue">Request Dialysis Transport</Link>
              <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> Call Dispatch</a>
              <div className="sp-addr">📍 2526 W. Freddy Gonzalez<br />Edinburg, TX 78539<br />Available 24 / 7</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta-banner">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Call us today for your free evaluation. We'll handle everything.</p>
          <Link to="/request" className="btn btn-blue">Request Transport</Link>
          <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> Call Now</a>
        </div>
      </section>
    </div>
  )
}
