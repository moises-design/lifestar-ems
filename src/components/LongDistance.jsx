import { Link } from 'react-router-dom'
import './LongDistance.css'

const cities = [
  { name: 'McAllen', sub: 'Starting Point', icon: '🏠' },
  { name: 'Houston', sub: 'Harris County', icon: '🌆' },
  { name: 'San Antonio', sub: 'Bexar County', icon: '🏙️' },
  { name: 'Corpus Christi', sub: 'Nueces County', icon: '🌊' },
  { name: 'Dallas', sub: 'Dallas County', icon: '🌇' },
  { name: 'Austin', sub: 'Travis County', icon: '🎸' },
  { name: 'Laredo', sub: 'Webb County', icon: '🌉' },
]

export default function LongDistance() {
  return (
    <section className="ld-section" id="long-distance">
      <div className="container">
        <div className="ld-header">
          <span className="section-label">Statewide Transport</span>
          <h2 className="section-title">We Transport <em>Across All of Texas</em></h2>
          <p className="section-sub">
            From the Rio Grande Valley to anywhere in Texas — professional, monitored transport
            with BLS/ALS certified crews for every mile of the journey.
          </p>
        </div>

        <div className="ld-cities">
          {cities.map(c => (
            <div key={c.name} className="ld-city-card">
              <div className="ld-city-icon">{c.icon}</div>
              <div className="ld-city-name">{c.name}</div>
              <div className="ld-city-sub">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="ld-cta">
          <p className="ld-cta-note">Hospital transfers · Specialist appointments · Family relocations</p>
          <Link to="/services/long-distance" className="ld-btn">
            Get a Free Quote →
          </Link>
        </div>
      </div>
    </section>
  )
}
