import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './FloatingNav.css'

const pages = [
  { label: 'Dialysis', href: '/services/dialysis', icon: '🏥' },
  { label: 'Therapy', href: '/services/therapy', icon: '👶' },
  { label: 'Pediatric', href: '/services/pediatrics', icon: '🚀' },
  { label: 'Events', href: '/services/events', icon: '🚑' },
  { label: 'Request', href: '/request', icon: '📋' },
  { label: 'Home', href: '/', icon: '🏠' },
]

export default function FloatingNav() {
  const location = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 120)
    window.addEventListener('scroll', fn)
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (!show) return null

  return (
    <nav className="fnav" aria-label="Quick navigation">
      {/* Desktop: right side */}
      <div className="fnav-side">
        {pages.map(p => (
          <Link key={p.href} to={p.href} className={'fnav-link' + (location.pathname === p.href ? ' active' : '')} title={p.label}>
            <span className="fnav-icon">{p.icon}</span>
            <span className="fnav-label">{p.label}</span>
          </Link>
        ))}
      </div>

      {/* Mobile: bottom bar */}
      <div className="fnav-bottom">
        {pages.map(p => (
          <Link key={p.href} to={p.href} className={'fnav-btm-link' + (location.pathname === p.href ? ' active' : '')} title={p.label}>
            <span>{p.icon}</span>
            <span className="fnav-btm-label">{p.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
