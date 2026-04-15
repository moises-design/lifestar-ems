import { Link } from 'react-router-dom'
import { FaFacebook, FaPhone } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/images/logo-icon.png" alt="Life Star EMS" />
              <span>LIFE STAR <span className="blue">EMS</span></span>
            </Link>
            <p>Professional non-emergency medical transport and EMS standby services across the Rio Grande Valley.</p>
            <a href="https://www.facebook.com/LifeStarEMSRGV/" target="_blank" rel="noreferrer" className="footer-fb">
              <FaFacebook /> Follow on Facebook
            </a>
          </div>

          <div className="footer-col">
            <div className="fcol-title">Services</div>
            <ul>
              <li><Link to="/services/dialysis">Dialysis Transport</Link></li>
              <li><Link to="/services/therapy">Pediatric Therapy</Link></li>
              <li><Link to="/services/pediatrics">Pediatric Long-Distance</Link></li>
              <li><Link to="/services/events">Event EMS Standby</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="fcol-title">Company</div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services/pediatrics">Pediatric Page</Link></li>
              <li><Link to="/coverage">Service Area</Link></li>
              <li><Link to="/request">Request Transport</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="fcol-title">Contact</div>
            <ul>
              <li><a href="tel:9566606543" className="footer-phone"><FaPhone /> (956) 660-6543</a></li>
              <li><a href="mailto:lifestarems.rgv@gmail.com">lifestarems.rgv@gmail.com</a></li>
              <li>2526 W. Freddy Gonzalez</li>
              <li>Edinburg, TX 78539</li>
              <li style={{color:'var(--blue-light)'}}>Dispatch Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Life Star EMS — Rio Grande Valley, TX. All rights reserved.</p>
          <p>lifestaremsrgv.com</p>
        </div>
      </div>
    </footer>
  )
}
