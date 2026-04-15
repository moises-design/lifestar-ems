import { FaMedal, FaClock, FaChild, FaHandshake, FaCalendarAlt, FaLanguage, FaHospitalUser, FaCreditCard } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './About.css'

const reasons = [
  { Icon: FaMedal,        text: 'Licensed and certified EMS professionals' },
  { Icon: FaClock,        text: 'Reliable and on-time service — every appointment' },
  { Icon: FaChild,        text: 'Experienced with pediatric and dialysis transport' },
  { Icon: FaHandshake,    text: 'Trusted by local organizations and schools' },
  { Icon: FaCalendarAlt,  text: 'Flexible scheduling to meet your needs' },
  { Icon: FaLanguage,     text: 'Bilingual staff — English & Spanish' },
  { Icon: FaHospitalUser, text: 'Coordinated care with healthcare providers' },
  { Icon: FaCreditCard,   text: 'Medicare, Medicaid & major insurance accepted' },
]

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <span className="label">Why Choose Us</span>
            <h2 className="title">The RGV's Trusted<br /><em>Transport Provider</em></h2>
            <p className="subtitle">Life Star EMS is locally owned and operated in the Rio Grande Valley. Our mission is simple: dependable, compassionate medical transport — every single ride.</p>
            <div className="why-grid">
              {reasons.map((r, i) => {
                const { Icon } = r
                return (
                  <div key={i} className="why-item">
                    <Icon className="why-icon" />
                    <span>{r.text}</span>
                  </div>
                )
              })}
            </div>
            <Link to="/request" className="btn btn-blue about-cta">Request Transport Today</Link>
          </div>

          <div className="about-cards">
            <div className="about-stat-card">
              <span className="asc-num">24/7</span>
              <span className="asc-label">Dispatch Available</span>
            </div>
            <div className="about-stat-card">
              <span className="asc-num">RGV</span>
              <span className="asc-label">Based & Operated</span>
            </div>
            <div className="about-stat-card about-stat-wide">
              <span className="asc-num">BLS / ALS</span>
              <span className="asc-label">Certified Professional Crews</span>
            </div>
            <div className="about-contact-card">
              <div className="acc-label">Call Dispatch Directly</div>
              <a href="tel:9566606543" className="acc-phone">(956) 660-6543</a>
              <div className="acc-sub">2526 W. Freddy Gonzalez, Edinburg TX</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
