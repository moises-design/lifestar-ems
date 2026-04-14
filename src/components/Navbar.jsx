import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa'
import './Navbar.css'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <a href="#home" className="nav-logo">
          <img src="/images/logo.png" alt="Life Star EMS Logo" className="nav-logo-img" />
          <span className="nav-logo-text">
            LIFE <span className="blue">STAR</span>
            <span className="nav-logo-sub">Emergency Medical Services</span>
          </span>
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li className="nav-phone-item">
            <a href="tel:9566489774" className="nav-phone-link">
              <FaPhone /> (956) 648-9774
            </a>
          </li>
        </ul>

        <a href="tel:9566489774" className="nav-cta desktop-only">
          <FaPhone /> (956) 648-9774
        </a>

        <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  )
}
