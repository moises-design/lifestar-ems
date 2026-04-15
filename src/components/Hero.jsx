import { Link } from 'react-router-dom'
import { FaPhone, FaFileAlt } from 'react-icons/fa'
import './Hero.css'

const stats = [
  { val: 'On-Time', label: 'Reliable Service' },
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

      <div className="hero-particles" aria-hidden>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${8 + i * 9}%`, animationDelay: `${i * 0.45}s`, animationDuration: `${3 + i % 3}s` }} />
        ))}
      </div>

      <div className="hero-content container">
        <div className="hero-logo-wrap">
          <img src="/images/logo-icon.png" alt="Life Star EMS" className="hero-logo" />
        </div>

        <div className="hero-eyebrow">
          <span className="hero-dot" />
          Serving the Rio Grande Valley — Reliable, Scheduled Transport
        </div>

        <h1 className="hero-h1">
          Reliable Medical Transport
          <span className="hero-accent">in the Rio Grande Valley</span>
        </h1>

        <p className="hero-desc">
          Specializing in dialysis transportation, pediatric therapy transport,
          and professional EMS standby for events across South Texas.
        </p>

        <div className="hero-btns">
          <Link to="/request" className="btn btn-blue btn-lg">
            <FaFileAlt /> Request Transport
          </Link>
          <a href="tel:9566606543" className="btn btn-outline btn-lg">
            <FaPhone /> Call Dispatch
          </a>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <div key={s.val} className="hero-stat">
              {i > 0 && <div className="stat-div" />}
              <div className="stat">
                <span className="stat-val">{s.val}</span>
                <span className="stat-lbl">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
