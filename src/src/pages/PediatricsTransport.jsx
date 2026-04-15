import { Link } from 'react-router-dom'
import { FaPhone, FaRocket, FaStar, FaGlobe, FaSmile, FaChild, FaRoute, FaCheckCircle, FaHeart, FaShieldAlt, FaComments } from 'react-icons/fa'
import './ServicePage.css'
import './PediatricsTransport.css'

const pServices = [
  {
    Icon: FaChild,
    color: '#48DBFB',
    title: 'Therapy Transport',
    items: ['Physical therapy', 'Occupational therapy', 'Speech therapy'],
    desc: 'We transport children to all types of therapy appointments with patience, care, and reliability.',
  },
  {
    Icon: FaRoute,
    color: '#A78BFA',
    title: 'Long-Distance Pediatric',
    items: ['Transport across Texas', 'Houston, SA, Dallas, Corpus', 'Coordinated with families'],
    desc: 'Safe, monitored long-distance transport for children needing care beyond the Rio Grande Valley.',
  },
]

const trustItems = [
  { Icon: FaSmile,    color: '#48DBFB', title: 'Friendly & Patient Staff',    desc: 'Our team is trained and experienced working with children — calm, kind, and always professional.' },
  { Icon: FaShieldAlt, color: '#A78BFA', title: 'Clean & Safe Vehicles',      desc: 'Well-maintained, fully equipped vehicles with child safety features for every trip.' },
  { Icon: FaCheckCircle, color: '#34D399', title: 'Reliable & On-Time',       desc: 'We track every appointment so children never miss a therapy session.' },
  { Icon: FaComments, color: '#FB923C',  title: 'Clear Parent Communication', desc: 'We keep families informed before, during, and after every transport.' },
]

// Multi-color stars for background
const starColors = ['#3DC8FF','#48DBFB','#A8E6CF','#FFFFFF','#E8F4FF','#FCD34D']
const bgStars = Array.from({length:55},(_,i)=>({
  left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
  size:`${Math.random()*3+1}px`,
  color: starColors[Math.floor(Math.random()*starColors.length)],
  delay:`${Math.random()*4}s`, dur:`${1.5+Math.random()*2.5}s`
}))

export default function PediatricsTransport() {
  return (
    <div className="sp peds-sp">

      {/* HERO */}
      <section className="sp-hero peds-hero">
        <div className="sp-hero-bg peds-bg">
          {/* Animated star field */}
          <div className="peds-stars">
            {bgStars.map((s,i)=>(
              <div key={i} className="p-star" style={{
                left:s.left, top:s.top,
                width:s.size, height:s.size,
                background:s.color,
                boxShadow:`0 0 ${parseInt(s.size)*3}px ${s.color}`,
                animationDelay:s.delay,
                animationDuration:s.dur,
              }} />
            ))}
          </div>
          {/* Planets */}
          <div className="peds-planet1" />
          <div className="peds-planet2" />
          {/* Animated FA icons floating */}
          <div className="peds-float-icons">
            <FaRocket  className="pf-icon pf-rocket"  style={{color:'#3DC8FF'}} />
            <FaStar    className="pf-icon pf-star1"   style={{color:'#FCD34D'}} />
            <FaStar    className="pf-icon pf-star2"   style={{color:'#A78BFA'}} />
            <FaGlobe   className="pf-icon pf-globe"   style={{color:'#48DBFB'}} />
          </div>
        </div>

        <div className="container sp-inner">
          <div className="sp-badge peds-badge">
            <FaRocket style={{color:'#3DC8FF'}} /> Pediatric Transportation
          </div>
          <h1 className="sp-h1">
            Safe, Friendly<br />
            <span className="sp-accent peds-accent">Pediatric Transportation</span>
          </h1>
          <p className="sp-lead">
            Helping children get to therapy safely, comfortably, and on time.
            Our staff is trained to work with kids — making every ride calm, friendly, and stress-free for the whole family.
          </p>
          <div className="sp-btns">
            <Link to="/request" className="btn btn-blue peds-btn">
              <FaChild /> Request Pediatric Transport
            </Link>
            <a href="tel:9566606543" className="btn btn-outline">
              <FaPhone /> Call Dispatch
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
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

      {/* TRUST */}
      <section className="sp-features">
        <div className="container">
          <span className="label">Why Parents Trust Us</span>
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

      {/* TWO-COL */}
      <section className="sp-two">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">Our Commitment</span>
              <h2 className="title">Every Child Deserves<br /><em>Safe, Caring Transport</em></h2>
              <ul className="sp-list">
                {[
                  'Parent or guardian always welcome to ride along',
                  'Child safety seats and wheelchair accessibility',
                  'Bilingual staff — English & Spanish',
                  'Consistent, familiar drivers',
                  'On-time pickup — every appointment',
                  'Coordination with therapy centers & providers',
                  'Long-distance transport across all of Texas',
                  'Insurance accepted — verified before first trip',
                ].map((item,i)=>(
                  <li key={i}><span className="sp-list-dot"/>{item}</li>
                ))}
              </ul>
            </div>
            <div className="sp-cta-box peds-cta-box">
              <div className="peds-cta-icon">
                <FaHeart className="peds-heart" />
              </div>
              <h3>Free Evaluation</h3>
              <p>Let's discuss your child's needs. We'll handle insurance verification and scheduling.</p>
              <Link to="/request" className="btn btn-blue peds-btn">
                <FaChild /> Request Pediatric Transport
              </Link>
              <a href="tel:9566606543" className="btn btn-outline">
                <FaPhone /> Call Dispatch
              </a>
              <div className="sp-addr">📍 2526 W. Freddy Gonzalez<br />Edinburg, TX 78539</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta-banner peds-cta-banner">
        <div className="container">
          <FaRocket className="peds-banner-rocket" />
          <h2>Schedule Safe Transport for Your Child</h2>
          <p>Call us or submit a request — we make the process simple so you can focus on your child.</p>
          <Link to="/request" className="btn btn-blue peds-btn btn-lg">
            <FaChild /> Request Pediatric Transport
          </Link>
          <a href="tel:9566606543" className="btn btn-outline btn-lg">
            <FaPhone /> (956) 660-6543
          </a>
        </div>
      </section>

    </div>
  )
}
