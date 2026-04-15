import { Link } from 'react-router-dom'
import { FaPhone, FaChild, FaClock, FaHeart, FaComments, FaShieldAlt, FaCheckCircle, FaStar, FaRocket } from 'react-icons/fa'
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

// Dense colorful star field
const starColors = ['#3DC8FF','#48DBFB','#A8E6CF','#FFFFFF','#E8F4FF','#FCD34D','#FB7185','#A78BFA']
const stars = Array.from({length:80}, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: `${Math.random() * 3 + 1}px`,
  color: starColors[Math.floor(Math.random() * starColors.length)],
  delay: `${Math.random() * 4}s`,
  dur: `${1.5 + Math.random() * 2.5}s`,
}))

// Shooting stars
const shootingStars = Array.from({length: 5}, (_, i) => ({
  id: i,
  top: `${10 + i * 15}%`,
  delay: `${i * 1.8}s`,
}))

export default function TherapyTransport() {
  return (
    <div className="sp therapy-sp">

      {/* ===== HERO ===== */}
      <section className="sp-hero therapy-hero">
        <div className="sp-hero-bg therapy-space-bg">

          {/* Rich star field */}
          <div className="therapy-stars">
            {stars.map(s => (
              <div key={s.id} className="th-star" style={{
                left: s.left, top: s.top,
                width: s.size, height: s.size,
                background: s.color,
                boxShadow: `0 0 ${parseInt(s.size) * 3}px ${s.color}`,
                animationDelay: s.delay,
                animationDuration: s.dur,
              }} />
            ))}
          </div>

          {/* Shooting stars */}
          <div className="therapy-shooting">
            {shootingStars.map(s => (
              <div key={s.id} className="shooting-star" style={{ top: s.top, animationDelay: s.delay }} />
            ))}
          </div>

          {/* Nebula glow blobs */}
          <div className="nebula nebula-1" />
          <div className="nebula nebula-2" />
          <div className="nebula nebula-3" />

          {/* Floating space icons */}
          <div className="th-floaters">
            <div className="th-float th-rocket">🚀</div>
            <div className="th-float th-planet1" />
            <div className="th-float th-planet2" />
            <div className="th-float th-star-icon"><FaStar /></div>
            <div className="th-float th-star-icon2"><FaStar /></div>
            <div className="th-float th-moon">🌙</div>
            <div className="th-float th-alien">👾</div>
            <div className="th-float th-sparkle">✨</div>
          </div>

          {/* Orbiting ring */}
          <div className="orbit-ring">
            <div className="orbit-dot" />
          </div>
        </div>

        <div className="container sp-inner therapy-hero-content">
          <div className="sp-badge therapy-badge">
            <FaChild style={{marginRight: 6}} /> Pediatric Therapy Transportation
          </div>
          <h1 className="sp-h1">
            Pediatric Therapy<br />
            <span className="sp-accent therapy-accent">Transportation</span>
          </h1>
          <p className="sp-lead">
            Reliable, compassionate transportation for children attending physical therapy,
            occupational therapy, and speech therapy across the Rio Grande Valley.
          </p>
          <div className="sp-btns">
            <Link to="/request" className="btn therapy-btn">
              <FaChild /> Request Therapy Transport
            </Link>
            <a href="tel:9566606543" className="btn btn-outline">
              <FaPhone /> (956) 660-6543
            </a>
          </div>

          {/* Fun space badges */}
          <div className="therapy-trust-badges">
            <div className="ttb">🛸 Safe Rides</div>
            <div className="ttb">⭐ On Time</div>
            <div className="ttb">💙 Kid Friendly</div>
            <div className="ttb">🌟 Trusted Families</div>
          </div>
        </div>
      </section>

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
              <a href="tel:9566606543" className="btn btn-outline" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'8px',marginBottom:'16px'}}>
                <FaPhone /> (956) 660-6543
              </a>
              <div className="sp-addr">
                📍 2526 W. Freddy Gonzalez<br />Edinburg, TX 78539
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="sp-cta-banner therapy-banner">
        <div className="therapy-banner-stars">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="tb-star" style={{
              left: `${Math.random()*100}%`,
              top: `${Math.random()*100}%`,
              width: `${Math.random()*3+1}px`,
              height: `${Math.random()*3+1}px`,
              animationDelay: `${Math.random()*3}s`,
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
          <a href="tel:9566606543" className="btn btn-outline btn-lg">
            <FaPhone /> (956) 660-6543
          </a>
        </div>
      </section>

    </div>
  )
}
