import { Link } from 'react-router-dom'
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { content } from '../v2/content'
import { SectionHeader } from '../v2/components'
import './CoverageMap.css'

const rgvCities = content.home.coverage.cities

// Same distances quoted on the Long-Distance Transport page
// (src/pages/LongDistanceTransport.jsx) — kept in one place there and
// mirrored here rather than duplicated as a second source of truth.
const longDistanceCities = [
  { name: 'Houston', miles: '~340 mi' },
  { name: 'San Antonio', miles: '~250 mi' },
  { name: 'Corpus Christi', miles: '~165 mi' },
  { name: 'Dallas', miles: '~490 mi' },
  { name: 'Austin', miles: '~320 mi' },
  { name: 'Laredo', miles: '~155 mi' },
]

// A real, honest service-area layout: verified city lists, not an
// approximate hand-placed map. An illustrated map implies a precision
// this data doesn't have; a clear list does not.
export default function CoverageMap() {
  return (
    <section className="covmap section" id="coverage">
      <div className="container">
        <SectionHeader title="Cities we serve" />

        <div className="covmap-layout">
          <div className="covmap-zone covmap-zone-primary">
            <div className="cz-head">
              <div className="cz-dot local" />
              <span className="cz-title">Rio Grande Valley, Headquartered in Edinburg</span>
            </div>
            <ul className="cz-city-grid">
              {rgvCities.map(name => (
                <li key={name} className={name === 'Edinburg' ? 'cz-city cz-city-hq' : 'cz-city'}>
                  {name === 'Edinburg' && <FaMapMarkerAlt aria-hidden="true" />}
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="covmap-info">
            <div className="covmap-zone">
              <div className="cz-head">
                <div className="cz-dot ld" />
                <span className="cz-title">Long-Distance, Across Texas</span>
              </div>
              <ul className="cz-chips">
                {longDistanceCities.map(c => (
                  <li key={c.name} className="cz-chip ld">{c.name} <span className="cz-chip-miles">{c.miles}</span></li>
                ))}
              </ul>
              <p className="cz-note">Interstate trips are also coordinated on request. Call to discuss your destination.</p>
              <Link to="/services/long-distance" className="btn btn-blue cz-cta">Long-Distance Transport &rarr;</Link>
            </div>

            <div className="covmap-contact">
              <FaPhone className="cc-icon" aria-hidden="true" />
              <div>
                <div className="cc-label">Call to Schedule</div>
                <a href="tel:+19566606543" className="cc-num">(956) 660-6543</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
