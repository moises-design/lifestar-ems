import { FaPhone, FaFacebook, FaChevronDown } from 'react-icons/fa'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-photo" />
        <div className="hero-gradient" />
        <div className="hero-grid" />
      </div>

      <div className="hero-inner container">
        <div className="hero-eyebrow">
          <span className="pulse-dot" />
          Serving the Rio Grande Valley — 24 / 7 / 365
        </div>

        <div className="hero-logo-big">
          <img src="/images/logo-transparent.png" alt="Life Star EMS" />
        </div>

        <h1 className="hero-title">
          <span className="line-top">When Every</span>
          <span className="line-blue">Second</span>
          <span className="line-bottom">Matters.</span>
        </h1>

        <p className="hero-desc">
          Life Star EMS delivers professional emergency and non-emergency medical
          transportation across the Rio Grande Valley. Certified crews. Rapid response.
          Compassionate care — every call.
        </p>

        <div className="hero-actions">
          <a href="tel:911" className="btn-primary">
            🚨 Dial 911 — Emergency
          </a>
          <a href="tel:9566606543" className="btn-outline">
            <FaPhone /> (956) 660-6543
          </a>
          <a href="https://www.facebook.com/LifeStarEMSRGV/" target="_blank" rel="noreferrer" className="btn-outline" style={{ color: '#7EB3F5', borderColor: 'rgba(126,179,245,0.3)' }}>
            <FaFacebook /> Follow Us
          </a>
        </div>

        <div className="hero-free-eval">
          <a href="tel:9566606543" className="free-eval-btn">
            ⭐ FREE Evaluation — Call (956) 660-6543
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-val">24 / 7</span>
            <span className="stat-label">Always On Call</span>
          </div>
          <div className="stat-div" />
          <div className="stat">
            <span className="stat-val">BLS / ALS</span>
            <span className="stat-label">Certified Crews</span>
          </div>
          <div className="stat-div" />
          <div className="stat">
            <span className="stat-val">RGV</span>
            <span className="stat-label">Full Valley Coverage</span>
          </div>
          <div className="stat-div" />
          <div className="stat">
            <span className="stat-val">★ 5.0</span>
            <span className="stat-label">Google Rated</span>
          </div>
        </div>
      </div>

      <a href="#services" className="hero-scroll"><FaChevronDown /></a>
    </section>
  )
}
