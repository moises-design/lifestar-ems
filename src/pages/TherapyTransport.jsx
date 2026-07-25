import { Link } from 'react-router-dom'
import { FaPhone, FaChild, FaClock, FaHeart, FaComments, FaShieldAlt, FaCheckCircle, FaStar, FaRocket } from 'react-icons/fa'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import './ServicePage.css'
import './TherapyTransport.css'

const therapies = [
  { icon: '🦵', emoji: '🏃', title: 'Physical Therapy', desc: 'Post-injury recovery, mobility, rehabilitation' },
  { icon: '✋', emoji: '🎨', title: 'Occupational Therapy', desc: 'Daily living skills, fine motor development' },
  { icon: '🗣️', emoji: '💬', title: 'Speech Therapy', desc: 'Communication, language, swallowing therapy' },
]

const feats = [
  { Icon: FaClock,     color: '#3DC8FF', title: 'On Time, Every Time',    desc: 'We track every appointment — your child never misses a session.' },
  { Icon: FaHeart,     color: '#FB7185', title: 'Patient & Kind',          desc: 'Our staff is calm, gentle, and experienced working with children.' },
  { Icon: FaComments,  color: '#A78BFA', title: 'Family Updates',          desc: 'We keep parents informed before, during, and after every ride.' },
  { Icon: FaShieldAlt, color: '#34D399', title: 'Safe Transport',          desc: 'Clean vehicles with child safety features every single trip.' },
]

// CTA banner star field, precomputed at module level so render stays pure
const bannerStars = Array.from({length: 30}, () => ({
  left: `${Math.random()*100}%`,
  top: `${Math.random()*100}%`,
  size: `${Math.random()*3+1}px`,
  delay: `${Math.random()*3}s`,
}))

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
                  <span className="ttc-icon">{t.icon}</span>
                  <span className="ttc-emoji">{t.emoji}</span>
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
                  'On-time pickup for every therapy session',
                  'Parent or guardian always welcome to ride along',
                  'Bilingual staff — English & Spanish',
                  'Consistent, familiar drivers your child will know',
                  'Direct coordination with therapy providers',
                  'Flexible scheduling around treatment plans',
                  'Insurance verified before first ride',
                  'Clean, safe, child-friendly vehicles',
                ].map((item, i) => (
                  <li key={i}><FaCheckCircle className="sp-list-check" />{item}</li>
                ))}
              </ul>
            </div>

            <div className="sp-cta-box therapy-cta-box">
              {/* Space header */}
              <div className="therapy-cta-space-header">
                <span className="tcsh-rocket">🚀</span>
                <div className="tcsh-stars">
                  {[...Array(8)].map((_, i) => <FaStar key={i} className="tcsh-star" style={{animationDelay: `${i*0.3}s`}} />)}
                </div>
              </div>
              <h3>Schedule Therapy Transport</h3>
              <p>We'll verify insurance and coordinate with your child's therapy team — at no cost to you.</p>
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
        <div className="therapy-banner-stars">
          {bannerStars.map((s, i) => (
            <div key={i} className="tb-star" style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            }} />
          ))}
        </div>
        <div className="container" style={{position:'relative',zIndex:2}}>
          <FaRocket className="therapy-banner-rocket" />
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
