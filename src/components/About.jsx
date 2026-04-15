import { FaCheckCircle } from 'react-icons/fa'
import './About.css'

const reasons = [
  'Licensed and certified EMS professionals',
  'Reliable and on-time service — every appointment',
  'Experienced with pediatric and dialysis transport',
  'Trusted by local organizations and events',
  'Flexible scheduling to meet your needs',
  'Bilingual staff — English & Spanish',
  'Medicare, Medicaid & most insurance accepted',
  'Coordinated care with healthcare providers',
]

const insurers = [
  'BlueCross BlueShield','Molina Healthcare','Ambetter','United Healthcare',
  'Cigna','Humana','Wellcare / Allwell','Aetna',
  "Driscoll Children's",'Healthspring','Superior Healthplan',
  'Medicare','Medicaid / CSHCN','Private Insurance',
]

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Why us */}
          <div className="about-main">
            <span className="label">Why Choose Us</span>
            <h2 className="title">The RGV's Trusted<br /><em>EMS & Transport Partner</em></h2>
            <p className="subtitle">Life Star EMS is locally owned and operated in the Rio Grande Valley. Our certified crews deliver professional, compassionate care — from dialysis runs to event standby coverage.</p>
            <ul className="why-list">
              {reasons.map((r, i) => (
                <li key={i}><FaCheckCircle className="why-check" />{r}</li>
              ))}
            </ul>
          </div>

          {/* Insurance */}
          <div className="about-ins">
            <div className="ins-box">
              <span className="label">We Work With</span>
              <h3 className="ins-title">Insurance We Accept</h3>
              <div className="ins-grid">
                {insurers.map((ins, i) => (
                  <div key={i} className="ins-tag">{ins}</div>
                ))}
              </div>
              <a href="tel:9566606543" className="btn btn-blue ins-cta">
                Free Insurance Verification
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
