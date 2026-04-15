import { FaPhone, FaCheckCircle } from 'react-icons/fa'
import './ServicePage.css'
import './TherapyTransport.css'

const therapyTypes = [
  { icon: '🦵', label: 'Physical Therapy', desc: 'Post-surgery, injury recovery, mobility improvement' },
  { icon: '🩹', label: 'Wound Care', desc: 'Regular wound care and dressing change appointments' },
  { icon: '🫧', label: 'Hyperbaric Medicine', desc: 'Hyperbaric oxygen therapy sessions' },
  { icon: '🎗️', label: 'Cancer Treatments', desc: 'Chemotherapy, radiation, oncology appointments' },
  { icon: '🏥', label: 'Hospital Admissions', desc: 'Planned hospital admissions and discharge transport' },
  { icon: '👨‍⚕️', label: 'Doctor Appointments', desc: 'Any specialist or primary care visits' },
]

const insurance = ['Medicare', 'Medicaid', 'BlueCross BlueShield', 'Molina Healthcare', 'Ambetter', 'United Healthcare', 'Cigna', 'Humana', 'Wellcare / Allwell', 'Aetna', 'Private Insurance']

const stars = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  size: `${Math.random() * 10 + 8}px`,
}))

export default function TherapyTransport() {
  return (
    <div className="service-page therapy-page">
      <section className="sp-hero therapy-hero">
        <div className="sp-hero-bg" />
        <div className="therapy-stars">
          {stars.map(s => (
            <div key={s.id} className="therapy-star" style={{ left: s.left, top: s.top, animationDelay: s.delay, fontSize: s.size }}>✦</div>
          ))}
        </div>
        <div className="therapy-float">🩺</div>
        <div className="container sp-hero-inner">
          <div className="sp-eyebrow"><span className="sp-dot" /> Specialty Medical Transportation</div>
          <h1 className="sp-title">
            Therapy &<br />
            <span className="sp-accent">Specialty</span><br />
            Transportation
          </h1>
          <p className="sp-desc">Whether it's weekly physical therapy, cancer treatments, or wound care — Life Star EMS provides reliable, on-time transportation so you never miss a critical appointment. Professional, compassionate staff every ride.</p>
          <div className="sp-actions">
            <a href="tel:9566606543" className="sp-btn-primary"><FaPhone /> Call (956) 660-6543</a>
            <div className="sp-free-badge">⭐ FREE Evaluation — No Obligation</div>
          </div>
        </div>
      </section>

      <section className="therapy-types">
        <div className="container">
          <span className="section-label">We Transport To</span>
          <h2 className="section-title">All Therapy &<br /><em>Medical Appointments</em></h2>
          <div className="therapy-grid">
            {therapyTypes.map((t, i) => (
              <div className="therapy-card" key={i}>
                <span className="therapy-icon">{t.icon}</span>
                <h3>{t.label}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-offer">
        <div className="container">
          <div className="sp-offer-grid">
            <div>
              <span className="section-label">Our Promise</span>
              <h2 className="section-title">Never Miss<br /><em>An Appointment</em></h2>
              <ul className="sp-checklist">
                {['Punctual pickup — we track your appointment time','Wheelchair and stretcher accessible vehicles','Trained staff to assist with mobility needs','Coordinated with your healthcare providers','Bilingual staff — English & Spanish','Flexible scheduling around treatment plans','Insurance verified before your first ride','Available 7 days a week'].map((item, i) => (
                  <li key={i}><FaCheckCircle className="check" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="sp-contact-box">
              <h3>Schedule Your Free Evaluation</h3>
              <p>We'll verify your insurance and coordinate with your care team at no cost.</p>
              <a href="tel:9566606543" className="sp-btn-primary" style={{ display:'flex', justifyContent:'center', marginBottom:16 }}><FaPhone /> (956) 660-6543</a>
              <a href="mailto:lifestarems.rgv@gmail.com" className="sp-btn-outline">lifestarems.rgv@gmail.com</a>
              <div className="sp-address">📍 2526 W. Freddy Gonzalez<br />Edinburg, TX 78539</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-insurance">
        <div className="container">
          <span className="section-label">No Surprise Bills</span>
          <h2 className="section-title">Insurance <em>We Accept</em></h2>
          <div className="sp-ins-grid">{insurance.map((ins, i) => <div className="sp-ins-badge" key={i}>{ins}</div>)}</div>
          <p className="sp-ins-note">Don't see your insurance? Call us — we'll verify your coverage for FREE.</p>
        </div>
      </section>

      <section className="sp-cta"><div className="container"><h2>Ready to Get Started?</h2><p>Call us today — we'll handle scheduling, insurance, and everything in between.</p><a href="tel:9566606543" className="sp-btn-primary large"><FaPhone /> Call (956) 660-6543 Now</a></div></section>
    </div>
  )
}
