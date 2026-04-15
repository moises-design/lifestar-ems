import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './FloatingNav.css'

const pages = [
  { label: 'Dialysis', href: '/services/dialysis', icon: '💉' },
  { label: 'Therapy', href: '/services/therapy', icon: '🩺' },
  { label: 'Pediatrics', href: '/services/pediatrics', icon: '👶' },
  { label: 'Long Distance', href: '/services/long-distance', icon: '🗺️' },
  { label: 'Event Standby', href: '/services/event-standby', icon: '🏆' },
]

export default function FloatingNav() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Only show on service pages
  const isServicePage = location.pathname.startsWith('/services/')

  useEffect(() => {
    if (!isServicePage) return
    const fn = () => setVisible(window.scrollY > 200)
    window.addEventListener('scroll', fn)
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [isServicePage])

  if (!isServicePage || !visible) return null

  return (
    <div className={`float-nav ${expanded ? 'expanded' : ''}`}>
      <button
        className="float-nav-toggle"
        onClick={() => setExpanded(e => !e)}
        aria-label="Service pages menu"
      >
        <span className="fnt-icon">🏥</span>
        {expanded && <span className="fnt-label">Services</span>}
      </button>

      {expanded && (
        <div className="float-nav-links">
          {pages.map(p => (
            <Link
              key={p.href}
              to={p.href}
              className={`float-nav-link ${location.pathname === p.href ? 'active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              <span className="fnl-icon">{p.icon}</span>
              <span className="fnl-label">{p.label}</span>
            </Link>
          ))}
          <Link to="/" className="float-nav-link float-nav-home" onClick={() => setExpanded(false)}>
            <span className="fnl-icon">🏠</span>
            <span className="fnl-label">Home</span>
          </Link>
        </div>
      )}
    </div>
  )
}
