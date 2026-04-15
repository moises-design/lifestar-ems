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
    window.addEventListener('scroll', fn)
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); setDropdown(false) }, [location])

  useEffect(() => {
    const fn = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-wrap container">
          <Link to="/" className="nav-logo">
            <img src="/images/logo-icon.png" alt="Life Star EMS" />
            <span className="nav-name">LIFE STAR <span className="nav-ems">EMS</span></span>
          </Link>

          <ul className={`nav-menu ${open ? 'open' : ''}`}>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li ref={dropRef} className="has-dd">
              <button className="nav-link nav-dd-btn" onClick={() => setDropdown(d => !d)}>
                Services <FaChevronDown className={`nav-chevron ${dropdown ? 'open' : ''}`} />
              </button>
              {dropdown && (
                <div className="nav-dropdown">
                  {serviceLinks.map(s => (
                    <Link key={s.href} to={s.href} className="dd-link" onClick={() => setDropdown(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li><Link to="/services/pediatrics" className="nav-link">Pediatric</Link></li>
            <li><Link to="/coverage" className="nav-link">Service Area</Link></li>
            <li><Link to="/request" className="nav-link">Request Transport</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>

          <div className="nav-right">
            <a href="tel:9566606543" className="nav-phone desktop-only">
              <FaPhone /> (956) 660-6543
            </a>
            <Link to="/request" className="btn btn-blue nav-cta desktop-only">
              Request Transport
            </Link>
            <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sticky call button */}
      <div className="mobile-sticky-call">
        <a href="tel:9566606543" className="sticky-call-btn">
          <FaPhone /> Call Dispatch — (956) 660-6543
        </a>
        <Link to="/request" className="sticky-request-btn">
          Request Transport
        </Link>
      </div>
    </>
  )
}
