import { FaFacebook, FaGoogle, FaPhone } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/logo.png" alt="Life Star EMS" />
              <div>
                <div className="footer-logo-name">LIFE <span>STAR</span></div>
                <div className="footer-logo-sub">Emergency Medical Services</div>
              </div>
            </div>
            <p className="footer-tagline">
              Professional emergency &amp; non-emergency medical transportation
              across the Rio Grande Valley — 24 / 7 / 365.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/LifeStarEMSRGV/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" aria-label="Google">
                <FaGoogle />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <ul>
              <li><Link to="/services/dialysis">Dialysis Transport</Link></li>
              <li><Link to="/services/therapy">Therapy Transport</Link></li>
              <li><Link to="/services/pediatrics">Pediatrics Transport</Link></li>
              <li><Link to="/services/long-distance">Long Distance Transport</Link></li>
              <li><Link to="/services/event-standby">Event Standby</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Quick Links</div>
            <ul>
              <li><a href="/#services">Services</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#coverage">Coverage Area</a></li>
              <li><a href="/#gallery">Gallery</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <ul>
              <li><a href="tel:9566606543">(956) 660-6543</a></li>
              <li><a href="mailto:lifestarems.rgv@gmail.com">lifestarems.rgv@gmail.com</a></li>
              <li>2526 W. Freddy Gonzalez</li>
              <li>Edinburg, TX 78539</li>
              <li style={{ color: 'var(--blue-light)' }}>24 / 7 Dispatch</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Life Star EMS — Rio Grande Valley, TX. All rights reserved.</p>
          <a href="https://lifestaremsrgv.com" target="_blank" rel="noreferrer">lifestaremsrgv.com</a>
        </div>
      </div>
    </footer>
  )
}
