import { Link } from 'react-router-dom'
import { FaPhone } from 'react-icons/fa'
import './ServicePage.css'
import './TherapyTransport.css'

const therapies = [
  { icon:'🦵', title:'Physical Therapy', desc:'Post-injury recovery, mobility improvement, rehabilitation' },
  { icon:'✋', title:'Occupational Therapy', desc:'Daily living skills, fine motor development' },
  { icon:'🗣️', title:'Speech Therapy', desc:'Communication, language development, swallowing' },
]

const feats = [
  { icon:'⏰', title:'On Time, Every Time', desc:'We track appointment schedules carefully so your child never misses therapy.' },
  { icon:'💙', title:'Patient & Compassionate', desc:'Our staff is trained to work with children — calm, kind, and caring.' },
  { icon:'👨‍👩‍👧', title:'Family Communication', desc:'We keep parents informed and coordinate directly with therapy providers.' },
  { icon:'🛡️', title:'Safe Transport', desc:'Fully equipped, clean vehicles with child safety features.' },
]

// Tiny star field for subtle space feel
const stars = Array.from({length:50},(_,i)=>({ left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, size:`${Math.random()*2+1}px`, delay:`${Math.random()*4}s`, dur:`${2+Math.random()*3}s` }))

export default function TherapyTransport() {
  return (
    <div className="sp therapy-sp">
      <section className="sp-hero therapy-hero">
        <div className="sp-hero-bg">
          <div className="therapy-nebula" />
          <div className="therapy-stars">
            {stars.map((s,i) => <div key={i} className="t-star" style={{left:s.left,top:s.top,width:s.size,height:s.size,animationDelay:s.delay,animationDuration:s.dur}} />)}
          </div>
          <div className="therapy-orb"><div className="therapy-ring"><div className="therapy-ring-dot"/></div></div>
        </div>
        <div className="container sp-inner">
          <div className="sp-badge"><span className="sp-dot" /> Pediatric Therapy Transportation</div>
          <h1 className="sp-h1">Pediatric Therapy<br /><span className="sp-accent therapy-accent">Transportation</span></h1>
          <p className="sp-lead">Reliable, compassionate transportation for children attending physical therapy, occupational therapy, and speech therapy across the Rio Grande Valley.</p>
          <div className="sp-btns">
            <Link to="/request" className="btn btn-blue">Request Therapy Transport</Link>
            <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> (956) 660-6543</a>
          </div>
        </div>
      </section>

      {/* Therapy types */}
      <section className="therapy-types section">
        <div className="container">
          <span className="label">What We Transport To</span>
          <h2 className="title">Therapy Types<br /><em>We Serve</em></h2>
          <div className="therapy-grid">
            {therapies.map((t,i) => (
              <div key={i} className="therapy-card">
                <span className="therapy-icon">{t.icon}</span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-features">
        <div className="container">
          <span className="label">Our Approach</span>
          <h2 className="title">Never Miss<br /><em>An Appointment</em></h2>
          <div className="sp-feat-grid">
            {feats.map((f,i) => <div key={i} className="sp-feat"><div className="sp-feat-icon">{f.icon}</div><h3>{f.title}</h3><p>{f.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section className="sp-two">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">Our Commitment</span>
              <h2 className="title">Your Child's Journey<br /><em>Matters to Us</em></h2>
              <ul className="sp-list">
                {['On-time pickup for every therapy session','Parent or guardian welcome to ride along','Bilingual staff — English & Spanish','Consistent drivers your child will recognize','Direct coordination with therapy providers','Flexible scheduling around treatment plans','Insurance verified before first ride','Available 7 days a week'].map((item,i)=>(<li key={i}><span className="sp-list-dot"/>{item}</li>))}
              </ul>
            </div>
            <div className="sp-cta-box">
              <h3>Schedule Transport</h3>
              <p>We'll verify insurance and coordinate with your child's therapy team — at no cost.</p>
              <Link to="/request" className="btn btn-blue">Request Therapy Transport</Link>
              <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> Call Dispatch</a>
              <div className="sp-addr">📍 2526 W. Freddy Gonzalez<br />Edinburg, TX 78539</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta-banner">
        <div className="container">
          <h2>Ready to Schedule?</h2>
          <p>We make it easy — just call or submit a request and we handle the rest.</p>
          <Link to="/request" className="btn btn-blue">Request Therapy Transport</Link>
          <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> Call Now</a>
        </div>
      </section>
    </div>
  )
}
