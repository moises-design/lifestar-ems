import './Services.css'

const services = [
  {
    icon: '🚑',
    title: 'Emergency Medical Transport',
    desc: 'Rapid-response emergency medical transport with fully equipped ambulances and certified EMT crews ready 24/7 for life-threatening situations.',
    tag: 'Priority Response',
  },
  {
    icon: '🏥',
    title: 'Non-Emergency Transport',
    desc: 'Safe, scheduled transportation to doctor appointments, dialysis, therapy, and medical procedures — comfortable and on time.',
    tag: 'Scheduled',
  },
  {
    icon: '🔄',
    title: 'Interfacility Transfers',
    desc: 'Professional patient transfers between hospitals, nursing homes, rehab centers, and clinics throughout the Rio Grande Valley.',
    tag: 'Facility to Facility',
  },
  {
    icon: '🛡️',
    title: 'BLS / ALS Services',
    desc: 'Basic Life Support and Advanced Life Support services delivered by certified paramedics and emergency medical technicians.',
    tag: 'Certified Care',
  },
  {
    icon: '👴',
    title: 'Long-Distance Transport',
    desc: 'Extended medical transport for patients needing to travel beyond the Valley — safe, monitored, and professionally staffed.',
    tag: 'Extended Range',
  },
  {
    icon: '📋',
    title: 'Insurance Accepted',
    desc: 'We work with Medicare, Medicaid, and most major insurance providers to ensure accessible care for all our patients.',
    tag: 'Most Plans',
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">
            Medical Transport<br />
            <em>You Can Count On</em>
          </h2>
          <p className="section-sub">
            From life-threatening emergencies to routine medical transport,
            Life Star EMS is your trusted partner in pre-hospital care across the RGV.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="sc-top">
                <span className="sc-icon">{s.icon}</span>
                <span className="sc-tag">{s.tag}</span>
              </div>
              <h3 className="sc-title">{s.title}</h3>
              <p className="sc-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
