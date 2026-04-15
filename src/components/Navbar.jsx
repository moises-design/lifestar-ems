import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa'
import './Navbar.css'

const serviceLinks = [
  { label: '🏥 Dialysis Transport', href: '/services/dialysis' },
  { label: '👶 Pediatric Therapy', href: '/services/therapy' },
  { label: '🚀 Pediatric Long-Distance', href: '/services/pediatrics' },
  { label: '🚑 Event EMS Standby', href: '/services/events' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const dropRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
    setDropdown(false)
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    const fn = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ===== TOP NAVBAR ===== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-wrap container">

          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
            <img src="/images/logo-icon.png" alt="Life Star EMS" />
            <span className="nav-name">LIFE STAR <span className="nav-ems">EMS</span></span>
          </Link>

          {/* Desktop links — hidden on mobile */}
          <ul className="nav-desktop-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li ref={dropRef} className="has-dd">
              <button className="nav-link nav-dd-btn" onClick={() => setDropdown(d => !d)}>
                Services <FaChevronDown className={`nav-chevron ${dropdown ? 'open' : ''}`} />
              </button>
              {dropdown && (
                <div className="nav-dropdown">
                  {serviceLinks.map(s => (
                    <Link key={s.href} to={s.href} className="dd-link"
                      onClick={() => setDropdown(false)}>{s.label}</Link>
                  ))}
                </div>
              )}
            </li>
            <li><Link to="/coverage" className="nav-link">Service Area</Link></li>
            <li><Link to="/request" className="nav-link">Request Transport</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>

          {/* Right side */}
          <div className="nav-right">
            <a href="tel:9566606543" className="nav-phone nav-desktop-only">
              <FaPhone /> (956) 660-6543
            </a>
            <Link to="/request" className="btn btn-blue nav-cta nav-desktop-only">
              Request Transport
            </Link>
            {/* Hamburger — mobile only */}
            <button
              className="nav-burger"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU — full screen, solid background ===== */}
      <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu-header">
          <img src="/images/logo-icon.png" alt="Life Star EMS" />
          <span className="mm-title">LIFE STAR <span className="mm-ems">EMS</span></span>
          <button className="mm-close" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="mobile-menu-body">
          <Link to="/" className="mm-item" onClick={() => setOpen(false)}>
            <span className="mm-icon">🏠</span> Home
          </Link>

          <div className="mm-section">SERVICES</div>
          {serviceLinks.map(s => (
            <Link key={s.href} to={s.href} className="mm-item mm-item--sub"
              onClick={() => setOpen(false)}>
              {s.label}
            </Link>
          ))}

          <div className="mm-divider" />

          <Link to="/coverage" className="mm-item" onClick={() => setOpen(false)}>
            <span className="mm-icon">📍</span> Service Area
          </Link>
          <Link to="/request" className="mm-item mm-item--cta" onClick={() => setOpen(false)}>
            <span className="mm-icon">📋</span> Request Transport
          </Link>
          <Link to="/contact" className="mm-item" onClick={() => setOpen(false)}>
            <span className="mm-icon">✉️</span> Contact
          </Link>
        </div>

        <div className="mobile-menu-footer">
          <a href="tel:9566606543" className="mm-call">
            <FaPhone /> Call (956) 660-6543
          </a>
        </div>
      </div>

      {/* Dark overlay behind menu */}
      {open && <div className="mobile-menu-backdrop" onClick={() => setOpen(false)} />}

      {/* ===== STICKY BOTTOM BAR — mobile only ===== */}
      <div className="mobile-bar">
        <a href="tel:9566606543" className="mobile-bar-call">
          <FaPhone /> (956) 660-6543
        </a>
        <Link to="/request" className="mobile-bar-request">
          Request Transport
        </Link>
      </div>
    </>
  )
}
