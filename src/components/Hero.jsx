import { Link } from 'react-router-dom'
import { FaPhone, FaFileAlt, FaChevronDown } from 'react-icons/fa'
import './Hero.css'

const stats = [
  { val: '24/7', label: 'Always Available' },
  { val: 'BLS/ALS', label: 'Certified Crews' },
  { val: 'RGV', label: 'Full Coverage' },
  { val: '★ 5.0', label: 'Google Rated' },
]

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-img" />
        <div className="hero-grad" />
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>

      {/* Subtle floating particles */}
      <div className="hero-particles" aria-hidden>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" style={{ left:`${8+i*9}%`, animationDelay:`${i*0.45}s`, animationDuration:`${3+i%3}s` }} />
        ))}
      </div>

      <div className="hero-content container">
        <div className="hero-logo-wrap">
          <img src="/images/logo-icon.png" alt="Life Star EMS" className="hero-logo" />
        </div>

        <div className="hero-badge">
          <span className="badge-dot" />
          Serving the Rio Grande Valley — 24 / 7 / 365
        </div>

        <h1 className="hero-h1">
          Reliable Medical Transport<br />
          <span className="hero-accent">&amp; EMS Standby</span><br />
          <span className="hero-sub-h">in the Rio Grande Valley</span>
        </h1>

        <p className="hero-desc">
          Specializing in dialysis transport, pediatric therapy transportation, and
          professional EMS coverage for events across South Texas.
        </p>

        <div className="hero-btns">
          <Link to="/request" className="btn btn-blue">
            <FaFileAlt /> Request EMS Coverage
          </Link>
          <a href="tel:9566606543" className="btn btn-outline">
            <FaPhone /> Call Dispatch
          </a>
          <a href="tel:911" className="btn btn-red">
            🚨 Emergency 911
          </a>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <>
              {i > 0 && <div key={`d${i}`} className="stat-div" />}
              <div key={s.val} className="stat">
                <span className="stat-val">{s.val}</span>
                <span className="stat-lbl">{s.label}</span>
              </div>
            </>
          ))}
        </div>
      </div>

      <a href="#services" className="hero-scroll" aria-label="Scroll down">
        <FaChevronDown />
      </a>
    </section>
  )
}
