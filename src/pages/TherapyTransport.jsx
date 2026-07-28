import { Link } from 'react-router-dom'
import { FaPhone, FaChild, FaClock, FaHeart, FaComments, FaComment, FaShieldAlt, FaCheckCircle, FaWalking, FaHandsHelping } from 'react-icons/fa'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import { AccessibleIcon } from '../v2/components'
import './ServicePage.css'
import './TherapyTransport.css'

const therapies = [
  { Icon: FaWalking,     title: 'Physical Therapy', desc: 'Post-injury recovery, mobility, rehabilitation' },
  { Icon: FaHandsHelping, title: 'Occupational Therapy', desc: 'Daily living skills, fine motor development' },
  { Icon: FaComment,     title: 'Speech Therapy', desc: 'Communication, language, swallowing therapy' },
]

const feats = [
  { Icon: FaClock,     color: '#0B9ED9', title: 'Careful, Reliable Scheduling', desc: 'We coordinate closely with your therapy provider to keep appointments on track.' },
  { Icon: FaHeart,     color: '#E8618C', title: 'Patient & Kind',          desc: 'Our staff is calm, gentle, and experienced working with children.' },
  { Icon: FaComments,  color: '#7C6FE0', title: 'Family Updates',          desc: 'We keep parents informed before, during, and after each ride.' },
  { Icon: FaShieldAlt, color: '#2E9E6B', title: 'Safe Transport',          desc: 'Clean vehicles with child safety features.' },
]

export default function TherapyTransport() {
  return (
    <InnerPage
      {...content.pages.therapy}
      breadcrumb={[{ label: 'Services' }, { label: 'Pediatric therapy transportation' }]}
      legacy
      cta={
        <>
          <Link to="/request" className="v2-btn v2-btn-primary">Request Therapy Transport</Link>
          <a href="tel:+19566606543" className="v2-btn v2-btn-secondary">Call dispatch (956) 660-6543</a>
        </>
      }
    >
    <div className="sp therapy-sp">

      {/* ===== THERAPY TYPES ===== */}
      <section className="therapy-types-section section">
        <div className="container">
          <span className="label">We Transport To</span>
          <h2 className="title">Therapy Types<br /><em>We Serve</em></h2>
          <div className="therapy-cards-grid">
            {therapies.map((t, i) => (
              <div key={i} className="therapy-type-card">
                <div className="ttc-top">
                  <AccessibleIcon icon={t.Icon} className="ttc-icon-wrap" size={24} />
                </div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <div className="ttc-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="sp-features therapy-features-bg">
        <div className="container">
          <span className="label">Our Promise to Parents</span>
          <h2 className="title">Why Families<br /><em>Choose Us</em></h2>
          <div className="sp-feat-grid therapy-feat-grid">
            {feats.map((f, i) => {
              const { Icon } = f
              return (
                <div key={i} className="sp-feat therapy-feat-card" style={{'--fc': f.color}}>
                  <div className="therapy-feat-icon-wrap">
                    <Icon className="therapy-feat-fa" />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TWO-COL ===== */}
      <section className="sp-two therapy-two-bg">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">Our Commitment</span>
              <h2 className="title">Every Child's Journey<br /><em>Matters to Us</em></h2>
              <ul className="sp-list">
                {[
                  'Careful pickup planned around therapy sessions',
                  'Parent or guardian welcome to ride along, space permitting',
                  'Bilingual staff — English & Spanish',
                  'Caring, professional drivers focused on your child’s comfort',
                  'Direct coordination with therapy providers',
                  'Flexible scheduling around treatment plans',
                  'Insurance details confirmed before first ride',
                  'Clean, safe, child-friendly vehicles',
                ].map((item, i) => (
                  <li key={i}><FaCheckCircle className="sp-list-check" />{item}</li>
                ))}
              </ul>
            </div>

            <div className="sp-cta-box therapy-cta-box">
              <h3>Schedule Therapy Transport</h3>
              <p>We'll verify insurance and coordinate directly with your child's therapy team.</p>
              <Link to="/request" className="btn therapy-btn" style={{display:'flex',justifyContent:'center',marginBottom:'10px'}}>
                <FaChild /> Request Therapy Transport
              </Link>
              <a href="tel:+19566606543" className="btn btn-outline" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'8px',marginBottom:'16px'}}>
                <FaPhone /> (956) 660-6543
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="sp-cta-banner therapy-banner">
        <div className="container">
          <h2>Ready to Schedule?</h2>
          <p>We make it simple — submit a request and we handle insurance, scheduling, and coordination.</p>
          <Link to="/request" className="btn therapy-btn btn-lg">
            <FaChild /> Request Therapy Transport
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
