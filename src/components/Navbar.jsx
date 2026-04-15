import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa'
import './Navbar.css'

const serviceLinks = [
  { label: '🚐 Dialysis Transport', href: '/services/dialysis' },
  { label: '🧑‍⚕️ Therapy Transport', href: '/services/therapy' },
  { label: '👶 Pediatrics Transport', href: '/services/pediatrics' },
  { label: '🚑 Long Distance Transport', href: '/services/long-distance' },
  { label: '🎪 Event Standby', href: '/services/event-standby' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const dropRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); setDropdown(false) }, [location])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          <img src="/images/logo-transparent.png" alt="Life Star EMS" className="nav-logo-img" />
          <span className="nav-logo-text">
            LIFE STAR <span className="purple">EMS</span>
            <span className="nav-logo-sub">Emergency Medical Services</span>
          </span>
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li className="nav-dropdown-wrap" ref={dropRef}>
            <button className="nav-dropdown-btn" onClick={() => setDropdown(d => !d)}>
              Services <FaChevronDown className={`drop-arrow ${dropdown ? 'open' : ''}`} />
            </button>
            {dropdown && (
              <div className="nav-dropdown">
                {serviceLinks.map(s => (
                  <Link key={s.href} to={s.href} className="nav-dropdown-item" onClick={() => setDropdown(false)}>
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#coverage">Coverage</a></li>
          <li><a href="/#gallery">Gallery</a></li>
          <li><a href="/#contact">Contact</a></li>
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
