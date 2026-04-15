import { Link } from 'react-router-dom'
import './Services.css'

const services = [
  {
    icon: '🏥',
    title: 'Adult Dialysis Transportation',
    href: '/services/dialysis',
    points: ['Reliable transport to and from dialysis', 'Consistent scheduling you can count on', 'Patient safety and comfort first'],
    color: '#0B9ED9',
  },
  {
    icon: '👶',
    title: 'Pediatric Therapy Transportation',
    href: '/services/therapy',
    points: ['PT, OT, and speech therapy visits', 'Patient, compassionate, reliable care', 'Designed for children and families'],
    color: '#48DBFB',
  },
  {
    icon: '🚀',
    title: 'Pediatric & Long-Distance Transport',
    href: '/services/pediatrics',
    points: ['Non-emergency pediatric transportation', 'Long-distance transport across Texas', 'Coordinated trips with families'],
    color: '#A78BFA',
  },
  {
    icon: '🚑',
    title: 'Event EMS Standby',
    href: '/services/events',
    points: ['Medical coverage for school events', 'Sports, tournaments, and community events', 'Fast on-site emergency response'],
    color: '#34D399',
  },
]

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="services-header">
          <span className="label">Core Services</span>
          <h2 className="title">Medical Transport &<br /><em>EMS Coverage</em></h2>
          <p className="subtitle">Professional, reliable, and compassionate — built for the Rio Grande Valley community.</p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <Link to={s.href} className="svc-card" key={i} style={{ '--accent': s.color }}>
              <div className="svc-icon">{s.icon}</div>
              <h3 className="svc-title">{s.title}</h3>
              <ul className="svc-points">
                {s.points.map((p, j) => (
                  <li key={j}><span className="svc-dot" />  {p}</li>
                ))}
              </ul>
              <span className="svc-learn">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
