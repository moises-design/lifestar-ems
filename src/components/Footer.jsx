import { FaFacebook, FaGoogle, FaPhone } from 'react-icons/fa'
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
              <li>Emergency Transport</li>
              <li>Non-Emergency Transport</li>
              <li>Interfacility Transfers</li>
              <li>BLS / ALS Services</li>
              <li>Long-Distance Transport</li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Quick Links</div>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#coverage">Coverage Area</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <ul>
              <li><a href="tel:9566489774">(956) 648-9774</a></li>
              <li><a href="mailto:info@lifestaremsrgv.com">info@lifestaremsrgv.com</a></li>
              <li>Rio Grande Valley, TX</li>
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
