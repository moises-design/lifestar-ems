import { Link } from 'react-router-dom'
import './Coverage.css'

const cities = ['Edinburg','McAllen','Mission','Pharr','Weslaco','Harlingen','Brownsville','San Juan','Alamo','Donna','Rio Grande City','Laredo','Los Fresnos','Mercedes']
const longDistance = ['Houston','San Antonio','Dallas','Corpus Christi','Austin','El Paso']

export default function Coverage() {
  return (
    <section className="coverage section" id="coverage">
      <div className="container">
        <div className="cov-header">
          <span className="label">Service Area</span>
          <h2 className="title">Where We Serve</h2>
          <p className="subtitle">Available 24/7 across the Rio Grande Valley and all of Texas for long-distance pediatric transport.</p>
        </div>

        <div className="cov-grid">
          <div className="cov-local">
            <div className="cov-box-title">📍 Rio Grande Valley</div>
            <div className="city-pills">
              {cities.map(c => <span key={c} className="city-pill">{c}</span>)}
            </div>
          </div>

          <div className="cov-long">
            <div className="cov-box-title">🚀 Long-Distance Texas</div>
            <div className="city-pills">
              {longDistance.map(c => <span key={c} className="city-pill city-pill-ld">{c}</span>)}
              <span className="city-pill city-pill-more">+ All of Texas</span>
            </div>
            <p className="cov-long-note">Long-distance pediatric transport available statewide — coordinated with families and providers.</p>
            <Link to="/services/pediatrics" className="btn btn-blue cov-ld-btn">Learn About Long-Distance Transport</Link>
          </div>
        </div>

        <div className="cov-map-wrap">
          <iframe
            src="https://maps.google.com/maps?q=Edinburg+Texas+78539&output=embed"
            title="Life Star EMS Service Area"
            loading="lazy" allowFullScreen
          />
          <div className="cov-map-tag">📍 2526 W. Freddy Gonzalez, Edinburg TX 78539 · (956) 660-6543</div>
        </div>
      </div>
    </section>
  )
}
