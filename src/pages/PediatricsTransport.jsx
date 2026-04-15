import { FaPhone, FaCheckCircle } from 'react-icons/fa'
import './ServicePage.css'
import './PediatricsTransport.css'

const features = [
  { icon: '😊', title: 'Kid-Friendly Staff', desc: 'Our team knows how to make children feel safe, calm, and comfortable.' },
  { icon: '🛡️', title: 'Safe & Secure', desc: 'Specially equipped vehicles with pediatric safety features for all ages.' },
  { icon: '💙', title: 'Family Centered', desc: 'Parents or guardians are always welcome to ride along.' },
  { icon: '📋', title: 'Care Coordinated', desc: "We work with your child's therapy team for seamless scheduling." },
]

const transportTo = [
  { icon: '🧠', label: 'Speech Therapy' },
  { icon: '🦵', label: 'Physical Therapy' },
  { icon: '✋', label: 'Occupational Therapy' },
  { icon: '🏥', label: 'Doctor Appointments' },
  { icon: '💊', label: 'Specialist Visits' },
  { icon: '🩺', label: 'Treatment Centers' },
  { icon: '🎯', label: 'ABA Therapy' },
  { icon: '❤️', label: 'Behavioral Health' },
]

const insurance = ['Driscoll Children\'s', 'Healthspring', 'Superior Healthplan', 'Medicaid CSHCN', 'United Healthcare', 'Molina Healthcare', 'Ambetter', 'Private Insurance']

// Colorful stars with random positions
const starColors = ['#48DBFB','#FF9F43','#FF6B9D','#A8FF78','#FFFFFF','#FFD700']
const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  size: `${Math.random() * 3 + 2}px`,
  color: starColors[Math.floor(Math.random() * starColors.length)],
  duration: `${1.5 + Math.random() * 2}s`,
}))

export default function PediatricsTransport() {
  return (
    <div className="service-page peds-page">
      <section className="sp-hero peds-hero">
        <div className="sp-hero-bg" />
        <div className="peds-stars">
          {stars.map(s => (
            <div key={s.id} className="peds-star" style={{
              left: s.left, top: s.top,
              animationDelay: s.delay,
              animationDuration: s.duration,
              width: s.size, height: s.size,
              background: s.color,
              boxShadow: `0 0 ${parseInt(s.size)*2}px ${s.color}`,
            }} />
          ))}
        </div>
        <div className="peds-planets">
          <div className="peds-planet-1" />
          <div className="peds-planet-2" />
        </div>
        <div className="peds-rocket">🚀</div>
        <div className="container sp-hero-inner">
          <div className="peds-badge">👶 Pediatric Specialists</div>
          <h1 className="sp-title">
            Safe & Caring<br />
            <span className="sp-accent peds-accent">Pediatric</span><br />
            Transportation
          </h1>
          <p className="sp-desc">We specialize in non-emergency medical transportation for children of all ages. Friendly, trained staff makes every ride comfortable, safe, and stress-free for your child and family.</p>
          <div className="sp-actions">
            <a href="tel:9566606543" className="sp-btn-primary peds-btn"><FaPhone /> Call (956) 660-6543</a>
            <div className="sp-free-badge peds-free">⭐ FREE Evaluation — No Obligation</div>
          </div>
        </div>
      </section>

      <section className="sp-features peds-features-section">
        <div className="container">
          <span className="section-label">Your Child's Comfort Comes First</span>
          <h2 className="section-title">A Ride They'll<br /><em>Feel Good About</em></h2>
          <div className="sp-features-grid">
            {features.map((f, i) => (
              <div className="sp-feature-card peds-card" key={i}>
                <div className="peds-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="peds-transport-to">
        <div className="container">
          <span className="section-label">Where We Take Your Child</span>
          <h2 className="section-title">Therapy & Medical<br /><em>Destinations</em></h2>
          <div className="peds-dest-grid">
            {transportTo.map((t, i) => (
              <div className="peds-dest-card" key={i}>
                <span className="peds-dest-icon">{t.icon}</span>
                <span className="peds-dest-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-offer">
        <div className="container">
          <div className="sp-offer-grid">
            <div>
              <span className="section-label">Our Commitment</span>
              <h2 className="section-title">Every Child<br /><em>Deserves Great Care</em></h2>
              <ul className="sp-checklist">
                {['Parent or guardian always welcome to ride along','Child safety seats and wheelchair accessibility','Bilingual staff — English & Spanish','Consistent, familiar drivers','On-time pickup — every single appointment','Direct coordination with therapy centers','Compassionate, patient, child-friendly staff','Available 7 days a week'].map((item, i) => (
                  <li key={i}><FaCheckCircle className="check peds-check" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="sp-contact-box peds-contact-box">
              <div className="peds-contact-emoji">👨‍👩‍👧‍👦</div>
              <h3>Free Evaluation</h3>
              <p>Let's talk about your child's needs. We'll handle insurance and scheduling.</p>
              <a href="tel:9566606543" className="sp-btn-primary peds-btn" style={{ display:'flex', justifyContent:'center', marginBottom:16 }}><FaPhone /> (956) 660-6543</a>
              <a href="mailto:lifestarems.rgv@gmail.com" className="sp-btn-outline">lifestarems.rgv@gmail.com</a>
              <div className="sp-address">📍 2526 W. Freddy Gonzalez<br />Edinburg, TX 78539</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-insurance">
        <div className="container">
          <span className="section-label">Coverage for Your Child</span>
          <h2 className="section-title">Insurance <em>We Accept</em></h2>
          <div className="sp-ins-grid">{insurance.map((ins, i) => <div className="sp-ins-badge peds-ins-badge" key={i}>{ins}</div>)}</div>
          <p className="sp-ins-note">We verify your child's insurance for FREE before the first ride.</p>
        </div>
      </section>

      <section className="sp-cta peds-cta-section">
        <div className="container">
          <div className="peds-cta-emoji">🌟</div>
          <h2>Your Child Deserves the Best</h2>
          <p>Call us today — we'll set up everything so your family can focus on what matters most.</p>
          <a href="tel:9566606543" className="sp-btn-primary peds-btn large"><FaPhone /> Call (956) 660-6543 Now</a>
        </div>
      </section>
    </div>
  )
}
