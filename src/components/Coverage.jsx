import './Coverage.css'

const cities = ['Edinburg','McAllen','Mission','Pharr','Weslaco','Harlingen','Brownsville','San Juan','Alamo','Donna','Rio Grande City','Laredo']

export default function Coverage() {
  return (
    <section className="coverage section" id="coverage">
      <div className="container">
        <div className="coverage-inner">
          <div className="coverage-text">
            <span className="label">Service Area</span>
            <h2 className="title">Covering the<br /><em>Rio Grande Valley</em></h2>
            <p className="subtitle">Available 24/7 across South Texas. Long-distance transport available statewide to Houston, San Antonio, Dallas, Corpus Christi, Austin, and beyond.</p>
            <div className="city-pills">
              {cities.map(c => <span key={c} className="city-pill">{c}</span>)}
              <span className="city-pill city-pill--more">+ Surrounding Areas</span>
            </div>
            <div className="coverage-cta">
              <a href="tel:9566606543" className="btn btn-blue">Call Dispatch — (956) 660-6543</a>
            </div>
          </div>
          <div className="coverage-map">
            <iframe
              src="https://maps.google.com/maps?q=Edinburg+Texas+78539&output=embed"
              title="Life Star EMS Service Area"
              loading="lazy" allowFullScreen
            />
            <div className="map-label">📍 2526 W. Freddy Gonzalez, Edinburg TX 78539</div>
          </div>
        </div>
      </div>
    </section>
  )
}
