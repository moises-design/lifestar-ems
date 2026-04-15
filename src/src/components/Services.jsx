import { Link } from 'react-router-dom'
import { FaWheelchair, FaChild, FaRoute, FaBriefcaseMedical, FaArrowRight } from 'react-icons/fa'
import './Services.css'

const services = [
  {
    Icon: FaWheelchair,
    color: '#0B9ED9',
    title: 'Dialysis Transport',
    sub: 'Adults',
    desc: 'Reliable, scheduled transportation for dialysis patients to and from treatment centers — on time, every time.',
    points: ['Consistent repeat scheduling', 'Door-to-door service', 'Wheelchair accessible'],
    href: '/services/dialysis',
  },
  {
    Icon: FaChild,
    color: '#48DBFB',
    title: 'Pediatric Therapy Transport',
    sub: 'Children',
    desc: 'Safe, patient, and dependable transport for children attending physical, occupational, and speech therapy visits.',
    points: ['PT, OT, Speech therapy', 'Compassionate staff', 'Family communication'],
    href: '/services/therapy',
  },
  {
    Icon: FaRoute,
    color: '#A78BFA',
    title: 'Pediatric Long-Distance',
    sub: 'Across Texas',
    desc: 'Non-emergency pediatric transportation across Texas, coordinated directly with families and medical providers.',
    points: ['Statewide transport', 'Houston, SA, Dallas, Corpus', 'Fully coordinated trips'],
    href: '/services/pediatrics',
  },
  {
    Icon: FaBriefcaseMedical,
    color: '#34D399',
    title: 'Event EMS Standby',
    sub: 'Events & Schools',
    desc: 'On-site medical coverage for schools, sports tournaments, concerts, and community events across the RGV.',
    points: ['School & sports events', 'Certified EMT crews on-site', 'Rapid on-site response'],
    href: '/services/events',
  },
]

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="svc-header">
          <div>
            <span className="label">What We Do</span>
            <h2 className="title">Our Core Services</h2>
          </div>
          <Link to="/request" className="btn btn-blue svc-header-cta">Request Transport</Link>
        </div>

        <div className="svc-grid">
          {services.map((s, i) => {
            const { Icon } = s
            return (
              <Link to={s.href} key={i} className="svc-card" style={{ '--accent': s.color }}>
                <div className="svc-top">
                  <div className="svc-icon-wrap">
                    <Icon className="svc-fa-icon" />
                  </div>
                  <span className="svc-sub">{s.sub}</span>
                </div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <ul className="svc-pts">
                  {s.points.map((p, j) => (
                    <li key={j}><span className="svc-dot" />{p}</li>
                  ))}
                </ul>
                <div className="svc-cta">
                  Learn More <FaArrowRight className="svc-arrow" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
