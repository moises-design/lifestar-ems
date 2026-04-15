import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa'
import './Navbar.css'

const serviceLinks = [
  { label: '🏥 Dialysis Transport', href: '/services/dialysis' },
  { label: '👶 Pediatric Therapy', href: '/services/therapy' },
  { label: '🚀 Pediatric & Long Distance', href: '/services/pediatrics' },
  { label: '🚑 Event EMS Standby', href: '/services/events' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const dropRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { setOpen(false); setDropdown(false) }, [location])
  useEffect(() => {
    const fn = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <nav className={"navbar" + (scrolled ? " scrolled" : "")}>
      <div className="nav-wrap container">
        <Link to="/" className="nav-logo">
          <img src="/images/logo-icon.png" alt="Life Star EMS" />
          <span className="nav-name">LIFE STAR <span className="ems">EMS</span></span>
        </Link>

        <ul className={"nav-menu" + (open ? " open" : "")}>
          <li ref={dropRef} className="has-dropdown">
            <button className="nav-item" onClick={() => setDropdown(d => !d)}>
              Services <FaChevronDown className={"chevron" + (dropdown ? " rotated" : "")} />
            </button>
            {dropdown && (
              <div className="nav-dropdown">
                {serviceLinks.map(s => (
                  <Link key={s.href} to={s.href} className="dd-item" onClick={() => setDropdown(false)}>{s.label}</Link>
                ))}
              </div>
            )}
          </li>
          <li><a href="/#about" className="nav-item">About</a></li>
          <li><a href="/#coverage" className="nav-item">Coverage</a></li>
          <li><Link to="/request" className="nav-item">Request Coverage</Link></li>
          <li><a href="/#contact" className="nav-item">Contact</a></li>
          <li className="mobile-only"><a href="tel:9566606543" className="btn btn-blue" style={{display:'flex',gap:'8px',alignItems:'center',margin:'12px 0'}}><FaPhone /> (956) 660-6543</a></li>
          <li className="mobile-only"><a href="tel:911" className="btn btn-red" style={{display:'flex',gap:'8px',alignItems:'center'}}>🚨 Emergency 911</a></li>
        </ul>

        <div className="nav-right">
          <a href="tel:911" className="nav-911 desktop-only">🚨 911</a>
          <a href="tel:9566606543" className="btn btn-blue desktop-only"><FaPhone /> (956) 660-6543</a>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="menu">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  )
}
