import { FaMapMarkerAlt } from 'react-icons/fa'
import './Coverage.css'

const cities = [
  'McAllen', 'Mission', 'Edinburg', 'Pharr', 'Harlingen',
  'Brownsville', 'Weslaco', 'Mercedes', 'San Juan', 'Alamo',
  'Donna', 'Rio Grande City', 'Laredo', 'Hidalgo', 'Sullivan City',
  'La Joya', 'Palmview', 'Penitas', 'Elsa', 'Edcouch',
  'San Benito', 'Los Fresnos', 'La Feria', 'Palm Valley',
]

const counties = ['Hidalgo County', 'Cameron County', 'Starr County']

export default function Coverage() {
  return (
    <section className="coverage" id="coverage">
      <div className="container">
        <div className="coverage-grid">
          <div className="coverage-text">
            <span className="section-label">Service Area</span>
            <h2 className="section-title">
              Full Rio Grande<br />
              <em>Valley Coverage</em>
            </h2>
            <p className="section-sub" style={{ marginTop: 16 }}>
              We serve communities across South Texas — if you're in the Rio Grande Valley,
              Life Star EMS is here for you.
            </p>

            <div className="county-tags">
              {counties.map(c => (
                <div className="county-tag" key={c}>
                  <FaMapMarkerAlt className="county-icon" />
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="cities-col">
            <p className="cities-heading">Communities We Serve</p>
            <div className="cities-grid">
              {cities.map(city => (
                <span className="city-pill" key={city}>{city}</span>
              ))}
              <span className="city-pill city-pill--more">+ More</span>
            </div>
          </div>
        </div>

        <div className="map-wrapper">
          <iframe
            title="Life Star EMS Service Area"
            src="https://maps.google.com/maps?q=2526+W+Freddy+Gonzalez+Edinburg+TX&output=embed"
            loading="lazy"
            allowFullScreen
          />
          <div className="map-overlay">
            <span>📍 2526 W. Freddy Gonzalez, Edinburg, TX 78539</span>
          </div>
        </div>
      </div>
    </section>
  )
}
