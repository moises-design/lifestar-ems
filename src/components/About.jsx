import { FaCheckCircle, FaFacebook, FaGoogle } from 'react-icons/fa'
import './About.css'

const values = [
  'Locally owned & operated in the Rio Grande Valley',
  'Certified EMT & Paramedic crews on every call',
  'Bilingual staff — English & Spanish',
  'Compassionate, patient-centered care',
  'Fully equipped, regularly inspected ambulances',
  'Medicare, Medicaid & insurance accepted',
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Visual side */}
          <div className="about-visual">
            <div className="av-card av-card--main">
              <div className="av-big">RGV</div>
              <div className="av-label">Home is Where We Serve</div>
            </div>
            <div className="av-card av-card--secondary">
              <div className="av-big" style={{ color: 'var(--gold)' }}>★ 5.0</div>
              <div className="av-label">Google Reviews</div>
              <div className="av-stars">★★★★★</div>
            </div>
            <div className="av-card av-card--accent">
              <div className="av-big">24H</div>
              <div className="av-label">Around the Clock</div>
            </div>
            <div className="av-social-row">
              <a
                href="https://www.facebook.com/LifeStarEMSRGV/"
                target="_blank"
                rel="noreferrer"
                className="av-social"
              >
                <FaFacebook /> Facebook
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="av-social"
              >
                <FaGoogle /> Google
              </a>
            </div>
          </div>

          {/* Text side */}
          <div className="about-text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              Proudly Serving<br />
              <em>Our Community</em>
            </h2>
            <p className="about-body">
              Life Star EMS is a locally owned and operated emergency medical services company
              based in the Rio Grande Valley, Texas. Our mission is simple: deliver fast,
              professional, and compassionate medical care — every single call.
            </p>
            <p className="about-body">
              From emergency response to scheduled non-emergency transport, we treat every
              patient with the dignity and urgency they deserve. Our bilingual crews understand
              this community because <strong>we are</strong> this community.
            </p>

            <ul className="about-values">
              {values.map((v, i) => (
                <li key={i}>
                  <FaCheckCircle className="check-icon" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary-red">
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
