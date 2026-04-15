import { Link } from 'react-router-dom'
import { FaPhone, FaCheckCircle, FaClock, FaHeart, FaCalendarAlt, FaUserMd } from 'react-icons/fa'
import './ServicePage.css'
import './DialysisTransport.css'

const features = [
  { icon: <FaClock />, title: 'Always On Time', desc: 'We understand dialysis has strict schedules. Our drivers arrive early — every time.' },
  { icon: <FaHeart />, title: 'Compassionate Care', desc: 'Our staff treats every patient with dignity, patience, and genuine care.' },
  { icon: <FaCalendarAlt />, title: 'Flexible Scheduling', desc: 'We coordinate with your dialysis center to match your exact treatment schedule.' },
  { icon: <FaUserMd />, title: 'Coordinated Care', desc: 'We communicate directly with your healthcare team for seamless transport.' },
]

const insurance = [
  'Medicare', 'Medicaid', 'BlueCross BlueShield', 'Molina Healthcare',
  'Ambetter', 'United Healthcare', 'Cigna', 'Humana',
  'Wellcare / Allwell', 'Aetna', 'Private Insurance',
]

export default function DialysisTransport() {
  return (
    <div className="service-page dialysis-page">

      {/* Hero */}
      <section className="sp-hero dialysis-hero">
        <div className="sp-hero-bg" />
        <div className="container sp-hero-inner">
          <div className="sp-eyebrow">
            <span className="sp-dot" />
            Specialized Medical Transportation
          </div>
          <h1 className="sp-title">
            Reliable Dialysis<br />
            <span className="sp-accent">Transportation</span><br />
            Specialists
          </h1>
          <p className="sp-desc">
            We understand that dialysis patients need consistent, dependable transport —
            three times a week, every week. Life Star EMS is your trusted partner for
            on-time, compassionate dialysis transportation across the Rio Grande Valley.
          </p>
          <div className="sp-actions">
            <a href="tel:9566606543" className="sp-btn-primary">
              <FaPhone /> Call (956) 660-6543
            </a>
            <div className="sp-free-badge">⭐ FREE Evaluation — No Obligation</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="sp-features">
        <div className="container">
          <span className="section-label">Why Families Trust Us</span>
          <h2 className="section-title">Built Around<br /><em>Your Schedule</em></h2>
          <div className="sp-features-grid">
            {features.map((f, i) => (
              <div className="sp-feature-card" key={i}>
                <div className="sp-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="sp-offer">
        <div className="container">
          <div className="sp-offer-grid">
            <div>
              <span className="section-label">Our Promise</span>
              <h2 className="section-title">Punctual.<br /><em>Professional. Caring.</em></h2>
              <ul className="sp-checklist">
                {[
                  'Door-to-door pickup and drop-off',
                  'Wheelchair and stretcher accessible vehicles',
                  'Trained and friendly EMT staff',
                  'Coordinated with your dialysis center',
                  'Consistent drivers you can recognize',
                  'Available 7 days a week',
                  'Bilingual staff — English & Spanish',
                  'Insurance verified before your first trip',
                ].map((item, i) => (
                  <li key={i}><FaCheckCircle className="check" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="sp-contact-box">
              <h3>Schedule Your Free Evaluation</h3>
              <p>We'll verify your insurance and set up your transport schedule at no cost.</p>
              <a href="tel:9566606543" className="sp-btn-primary" style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <FaPhone /> (956) 660-6543
              </a>
              <a href="mailto:lifestarems.rgv@gmail.com" className="sp-btn-outline">
                lifestarems.rgv@gmail.com
              </a>
              <div className="sp-address">
                📍 2526 W. Freddy Gonzalez<br />Edinburg, TX 78539
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="sp-insurance">
        <div className="container">
          <span className="section-label">No Surprise Bills</span>
          <h2 className="section-title">Insurance <em>We Accept</em></h2>
          <div className="sp-ins-grid">
            {insurance.map((ins, i) => (
              <div className="sp-ins-badge" key={i}>{ins}</div>
            ))}
          </div>
          <p className="sp-ins-note">
            Don't see your insurance? Call us — we'll verify your coverage for FREE.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Call us today for your free evaluation. We'll handle everything.</p>
          <a href="tel:9566606543" className="sp-btn-primary large">
            <FaPhone /> Call (956) 660-6543 Now
          </a>
        </div>
      </section>
    </div>
  )
}
