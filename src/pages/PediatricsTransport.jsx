import { Link } from 'react-router-dom'
import { FaPhone, FaLifeRing, FaFish, FaSmile, FaChild, FaRoute, FaCheckCircle, FaHeart, FaShieldAlt, FaComments } from 'react-icons/fa'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import './ServicePage.css'
import './PediatricsTransport.css'

const pServices = [
  {
    Icon: FaChild,
    color: '#0EA5B0',
    title: 'Therapy Transport',
    items: ['Physical therapy', 'Occupational therapy', 'Speech therapy'],
    desc: 'We transport children to therapy appointments with patience, care, and reliability.',
  },
  {
    Icon: FaRoute,
    color: '#2D7DA6',
    title: 'Long-Distance Pediatric',
    items: ['Transport across Texas', 'Houston, SA, Dallas, Corpus', 'Coordinated with families'],
    desc: 'Safe, monitored long-distance transport for children needing care beyond the Rio Grande Valley.',
  },
]

const trustItems = [
  { Icon: FaSmile,    color: '#0EA5B0', title: 'Friendly & Patient Staff',    desc: 'Our team is trained and experienced working with children — calm, kind, and professional.' },
  { Icon: FaShieldAlt, color: '#3E8FB0', title: 'Clean & Safe Vehicles',      desc: 'Well-maintained vehicles with child safety features.' },
  { Icon: FaCheckCircle, color: '#2E9E6B', title: 'Coordinated Scheduling',   desc: 'We track appointments closely and coordinate with your therapy provider.' },
  { Icon: FaComments, color: '#FF8A65',  title: 'Clear Parent Communication', desc: 'We keep families informed before, during, and after each transport.' },
]

// Restrained, original ocean-themed decorative band for the page intro —
// waves, bubbles, coral, and a friendly fish, built from plain CSS shapes
// and existing FA icons (no illustration library, no external assets).
// Purely visual: hidden from assistive tech. See PediatricsTransport.css
// for the reduced-motion-aware treatment.
const pedsOceanArt = (
  <div className="peds-ocean-art" aria-hidden="true">
    <span className="peds-bubble peds-bubble-1" />
    <span className="peds-bubble peds-bubble-2" />
    <span className="peds-bubble peds-bubble-3" />
    <span className="peds-bubble peds-bubble-4" />
    <span className="peds-coral peds-coral-1" />
    <span className="peds-coral peds-coral-2" />
    <span className="peds-coral peds-coral-3" />
    <FaFish className="peds-fish peds-fish-1" />
    <FaFish className="peds-fish peds-fish-2" />
    <svg className="peds-wave" viewBox="0 0 800 60" preserveAspectRatio="none">
      <path d="M0,32 C100,55 200,8 300,30 C400,52 500,10 600,30 C680,45 750,22 800,30 L800,60 L0,60 Z" />
    </svg>
  </div>
)

export default function PediatricsTransport() {
  return (
    <InnerPage
      {...content.pages.pediatrics}
      breadcrumb={[{ label: 'Services' }, { label: 'Pediatric transportation' }]}
      legacy
      media={pedsOceanArt}
      cta={
        <>
          <Link to="/request" className="v2-btn v2-btn-primary">Request Pediatric Transport</Link>
          <a href="tel:+19566606543" className="v2-btn v2-btn-secondary">Call dispatch (956) 660-6543</a>
        </>
      }
    >
    <div className="sp peds-sp">

      {/* WHAT WE PROVIDE */}
      <section className="peds-services section">
        <div className="container">
          <span className="label">What We Provide</span>
          <h2 className="title">Pediatric Transport<br /><em>Services</em></h2>
          <div className="peds-svc-grid">
            {pServices.map((s, i) => {
              const { Icon } = s
              return (
                <div key={i} className="peds-svc-card" style={{'--psvc-color': s.color}}>
                  <div className="psvc-icon-wrap">
                    <Icon className="psvc-fa-icon" />
                  </div>
                  <h3>{s.title}</h3>
                  <p className="psvc-desc">{s.desc}</p>
                  <ul>
                    {s.items.map((item,j)=>(
                      <li key={j}>
                        <FaCheckCircle className="psvc-check" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SAFETY AND COMMUNICATION */}
      <section className="sp-features">
        <div className="container">
          <span className="label">Safety and Communication</span>
          <h2 className="title">Your Child Is<br /><em>In Good Hands</em></h2>
          <div className="sp-feat-grid">
            {trustItems.map((t, i) => {
              const { Icon } = t
              return (
                <div key={i} className="sp-feat peds-feat" style={{'--tfeat-color': t.color}}>
                  <div className="peds-feat-icon-wrap">
                    <Icon className="peds-feat-icon" />
                  </div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAMILY AND FACILITY COORDINATION */}
      <section className="sp-two">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">Family and Facility Coordination</span>
              <h2 className="title">Every Child Deserves<br /><em>Safe, Caring Transport</em></h2>
              <ul className="sp-list">
                {[
                  'Parent or guardian welcome to ride along, space permitting',
                  'Child safety seats and wheelchair accessibility',
                  'Bilingual staff — English & Spanish',
                  'Caring, professional drivers',
                  'Pickup planned around your appointment time',
                  'Coordination with therapy centers & providers',
                  'Long-distance transport coordinated across Texas',
                  'Insurance details confirmed before first trip',
                ].map((item,i)=>(
                  <li key={i}><span className="sp-list-dot"/>{item}</li>
                ))}
              </ul>
            </div>
            <div className="sp-cta-box peds-cta-box">
              <div className="peds-cta-icon">
                <FaHeart className="peds-heart" aria-hidden="true" />
              </div>
              <h3>Let's Get Started</h3>
              <p>Let's discuss your child's needs. We'll verify insurance and coordinate scheduling with you.</p>
              <Link to="/request" className="btn btn-blue peds-btn">
                <FaChild /> Request Pediatric Transport
              </Link>
              <a href="tel:+19566606543" className="btn btn-outline">
                <FaPhone /> Call Dispatch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST AND DISPATCH */}
      <section className="sp-cta-banner peds-cta-banner">
        <div className="container">
          <FaLifeRing className="peds-banner-ring" aria-hidden="true" />
          <h2>Schedule Safe Transport for Your Child</h2>
          <p>Call us or submit a request — we make the process simple so you can focus on your child.</p>
          <Link to="/request" className="btn btn-blue peds-btn btn-lg">
            <FaChild /> Request Pediatric Transport
          </Link>
          <a href="tel:+19566606543" className="btn btn-outline btn-lg">
            <FaPhone /> (956) 660-6543
          </a>
        </div>
      </section>

    </div>
    </InnerPage>
  )
}
