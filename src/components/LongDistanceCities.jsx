import { Link } from 'react-router-dom'
import './LongDistanceCities.css'

const cities = [
  { name: 'Houston', miles: '340 miles', icon: '🏙️' },
  { name: 'San Antonio', miles: '250 miles', icon: '🌉' },
  { name: 'Corpus Christi', miles: '165 miles', icon: '⚓' },
  { name: 'Dallas', miles: '490 miles', icon: '🏢' },
  { name: 'Austin', miles: '320 miles', icon: '🎸' },
  { name: 'Laredo', miles: '155 miles', icon: '🌵' },
]

export default function LongDistanceCities() {
  return (
    <section className="longdist">
      <div className="container">
        <div className="longdist-inner">
          <div className="longdist-text">
            <span className="section-label">Beyond the Valley</span>
            <h2 className="section-title">
              We Transport<br /><em>Across All of Texas</em>
            </h2>
            <p className="section-sub">
              Need to get to a specialist in Houston or a hospital in San Antonio?
              Life Star EMS provides safe, monitored long-distance medical transport
              with certified BLS/ALS crews — anywhere in Texas.
            </p>
            <div className="longdist-features">
              <div className="ldf">✅ BLS / ALS Certified Crews</div>
              <div className="ldf">✅ Continuous Patient Monitoring</div>
              <div className="ldf">✅ Wheelchair & Stretcher Transport</div>
              <div className="ldf">✅ Insurance Accepted</div>
              <div className="ldf">✅ 24 / 7 Availability</div>
              <div className="ldf">✅ FREE Quote — No Obligation</div>
            </div>
            <Link to="/services/long-distance" className="btn-primary-blue">
              Get a Free Quote →
            </Link>
          </div>

          <div className="longdist-cities">
            <p className="cities-from">From <strong>Rio Grande Valley</strong> to:</p>
            <div className="city-cards">
              {cities.map(c => (
                <div className="city-card" key={c.name}>
                  <span className="city-icon">{c.icon}</span>
                  <span className="city-name">{c.name}</span>
                  <span className="city-miles">{c.miles}</span>
                </div>
              ))}
            </div>
            <div className="anywhere-badge">
              🗺️ We transport anywhere in Texas
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
