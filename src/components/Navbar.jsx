import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa'
import './Navbar.css'

const serviceLinks = [
  { label: 'Dialysis Transport', to: '/services/dialysis' },
  { label: 'Therapy Transport', to: '/services/therapy' },
  { label: 'Pediatrics Transport', to: '/services/pediatrics' },
  { label: 'Long Distance Transport', to: '/services/long-distance' },
  { label: 'Event Standby', to: '/services/event-standby' },
]

const mainLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Coverage', href: '/#coverage' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const closeAll = () => {
    setOpen(false)
    setServicesOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          <img src="/images/logo.png" alt="Life Star EMS Logo" className="nav-logo-img" />
          <span className="nav-logo-text">
            LIFE <span className="blue">STAR</span>
            <span className="nav-logo-sub">Emergency Medical Services</span>
          </span>
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {/* Services dropdown */}
          <li className="has-dropdown">
            <button
              className="nav-dropdown-trigger"
              onClick={() => setServicesOpen(o => !o)}
            >
              Services
              <FaChevronDown className={`dropdown-arrow ${servicesOpen ? 'rotated' : ''}`} />
            </button>
            <ul className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}>
              {serviceLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} onClick={closeAll}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </li>

          {mainLinks.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={closeAll}>{l.label}</a>
            </li>
          ))}

          <li className="nav-phone-item">
            <a href="tel:9566606543" className="nav-phone-link">
              <FaPhone /> (956) 660-6543
            </a>
          </li>
        </ul>

        <a href="tel:9566606543" className="nav-cta desktop-only">
          <FaPhone /> (956) 660-6543
        </a>

        <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  )
}
