import { Link } from 'react-router-dom'
import { FaPhone, FaWheelchair, FaClock, FaHeart, FaCalendarAlt, FaHospitalUser, FaCheckCircle } from 'react-icons/fa'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'
import './ServicePage.css'
import './DialysisTransport.css'

const feats = [
  { Icon: FaClock,        title: 'Always On Time',         desc: 'Dialysis has strict schedules. Our drivers arrive early — every single appointment.' },
  { Icon: FaHeart,        title: 'Compassionate Care',      desc: 'We treat every patient with dignity, patience, and genuine respect.' },
  { Icon: FaCalendarAlt,  title: 'Flexible Scheduling',     desc: 'We coordinate directly with your dialysis center to match your treatment schedule.' },
  { Icon: FaHospitalUser, title: 'Provider Coordination',   desc: 'Direct communication with your healthcare team for seamless transport.' },
]

export default function DialysisTransport() {
  return (
    <InnerPage
      {...content.pages.dialysis}
      breadcrumb={[{ label: 'Services' }, { label: 'Dialysis transportation' }]}
      legacy
      cta={
        <>
          <Link to="/request" className="v2-btn v2-btn-primary">Request Transport</Link>
          <a href="tel:+19566606543" className="v2-btn v2-btn-secondary">Call dispatch (956) 660-6543</a>
        </>
      }
    >
    <div className="sp dialysis-sp">
      <section className="sp-features">
        <div className="container">
          <span className="label">Why Families Trust Us</span>
          <h2 className="title">Built Around<br /><em>Your Schedule</em></h2>
          <div className="sp-feat-grid">
            {feats.map((f, i) => {
              const { Icon } = f
              return (
                <div key={i} className="sp-feat">
                  <div className="sp-feat-icon-wrap">
                    <Icon className="sp-fa-icon" />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="sp-two">
        <div className="container">
          <div className="sp-two-grid">
            <div>
              <span className="label">Our Promise</span>
              <h2 className="title">Punctual.<br /><em>Professional. Caring.</em></h2>
              <ul className="sp-list">
                {['Door-to-door pickup and drop-off','Wheelchair and stretcher accessible vehicles','Trained and friendly EMT staff','Coordinated with your dialysis center','Consistent, familiar drivers you recognize','Bilingual staff — English & Spanish','Insurance verified before your first trip'].map((item,i)=>(
                  <li key={i}><FaCheckCircle className="sp-list-check" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="sp-cta-box">
              <h3>Free Evaluation</h3>
              <p>We'll verify your insurance and set up your transport schedule at no cost to you.</p>
              <Link to="/request" className="btn btn-blue"><FaWheelchair /> Request Transport</Link>
              <a href="tel:+19566606543" className="btn btn-outline"><FaPhone /> Call Dispatch</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-cta-banner">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Call us today for your free evaluation. We'll handle everything.</p>
          <Link to="/request" className="btn btn-blue btn-lg"><FaWheelchair /> Request Transport</Link>
          <a href="tel:+19566606543" className="btn btn-outline btn-lg"><FaPhone /> (956) 660-6543</a>
        </div>
      </section>
    </div>
    </InnerPage>
  )
}
