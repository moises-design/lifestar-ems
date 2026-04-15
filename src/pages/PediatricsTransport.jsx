import { Link } from 'react-router-dom'
import { FaPhone } from 'react-icons/fa'
import './ServicePage.css'
import './PediatricsTransport.css'

const services = [
  { icon:'🛰️', title:'Therapy Transport', items:['Physical therapy','Occupational therapy','Speech therapy'] },
  { icon:'🌎', title:'Long-Distance Pediatric', items:['Transport across Texas','Houston, San Antonio, Dallas','Coordinated with families'] },
]

const trust = [
  { icon:'👨‍⚕️', title:'Trained & Experienced Staff', desc:'Our team is experienced working with children — patient, calm, and professional.' },
  { icon:'🛡️', title:'Safety First', desc:'Clean, well-equipped vehicles with child safety features for every trip.' },
  { icon:'📱', title:'Family Communication', desc:'We keep parents informed before, during, and after every transport.' },
  { icon:'🎯', title:'Child-Centered Approach', desc:'Every decision we make puts the comfort and wellbeing of your child first.' },
]

// Colorful multi-size stars
const starColors = ['#3DC8FF','#48DBFB','#A8E6CF','#FFFFFF','#E8F4FF']
const stars = Array.from({length:60},(_,i)=>({
  left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
  size:`${Math.random()*3+1.5}px`,
  color: starColors[Math.floor(Math.random()*starColors.length)],
  delay:`${Math.random()*4}s`, dur:`${1.5+Math.random()*2.5}s`
}))

export default function PediatricsTransport() {
  return (
    <div className="sp peds-sp">
      <section className="sp-hero peds-hero">
        <div className="sp-hero-bg peds-bg">
          <div className="peds-stars">
            {stars.map((s,i)=><div key={i} className="p-star" style={{left:s.left,top:s.top,width:s.size,height:s.size,background:s.color,boxShadow:`0 0 ${parseInt(s.size)*2}px ${s.color}`,animationDelay:s.delay,animationDuration:s.dur}} />)}
          </div>
          <div className="peds-planet1" />
          <div className="peds-planet2" />
          <div className="peds-rocket">🚀</div>
        </div>
        <div className="container sp-inner">
          <div className="sp-badge peds-badge">🚀 Pediatric & Long-Distance Transport</div>
          <h1 className="sp-h1">
            Safe, Compassionate<br />
            <span className="sp-accent peds-accent">Pediatric Transportation</span>
          </h1>
          <p className="sp-lead">Reliable transportation for children needing therapy services and long-distance care across Texas. Our trained staff creates a calm, safe experience for every child and family.</p>
          <div className="sp-btns">
            <Link to="/request" className="btn btn-blue peds-btn">Request Pediatric Transport</Link>
            <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> Call Dispatch</a>
          </div>
        </div>
      </section>

      {/* Space-themed service sections */}
      <section className="peds-services section">
        <div className="container">
          <span className="label">What We Provide</span>
          <h2 className="title">Pediatric Transport<br /><em>Services</em></h2>
          <div className="peds-svc-grid">
            {services.map((s,i) => (
              <div key={i} className="peds-svc-card">
                <div className="psvc-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <ul>{s.items.map((item,j)=><li key={j}><span className="psvc-dot"/>  {item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="sp-features">
        <div className="container">
          <span className="label">Why Parents Trust Us</span>
          <h2 className="title">Your Child Is<br /><em>In Good Hands</em></h2>
          <div className="sp-feat-grid">
            {trust.map((t,i)=><div key={i} className="sp-feat peds-feat"><div className="sp-feat-icon">{t.icon}</div><h3>{t.title}</h3><p>{t.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section className="sp-two">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">Our Commitment</span>
              <h2 className="title">Every Child Deserves<br /><em>Safe, Caring Transport</em></h2>
              <ul className="sp-list">
                {['Parent or guardian always welcome to ride along','Child safety seats and wheelchair accessibility','Bilingual staff — English & Spanish','Consistent, familiar drivers','On-time pickup — every single appointment','Coordination with therapy centers and providers','Long-distance transport across all of Texas','Insurance accepted — verified before first trip'].map((item,i)=>(<li key={i}><span className="sp-list-dot"/>{item}</li>))}
              </ul>
            </div>
            <div className="sp-cta-box peds-cta-box">
              <div className="peds-emoji">👨‍👩‍👧‍👦</div>
              <h3>Free Evaluation</h3>
              <p>Let's discuss your child's transportation needs. We'll handle insurance and scheduling.</p>
              <Link to="/request" className="btn btn-blue peds-btn">Request Pediatric Transport</Link>
              <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> Call Dispatch</a>
              <div className="sp-addr">📍 2526 W. Freddy Gonzalez<br />Edinburg, TX 78539</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta-banner peds-cta-banner">
        <div className="container">
          <h2>Schedule Safe Transport for Your Child</h2>
          <p>Call us today — we make the process simple so you can focus on your child.</p>
          <Link to="/request" className="btn btn-blue peds-btn">Request Pediatric Transport</Link>
          <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> Call Now</a>
        </div>
      </section>
    </div>
  )
}
