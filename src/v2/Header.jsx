import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { content } from './content'
import './Header.css'

const { brand, nav, emergencyNotice } = content

function ServicesDropdown() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const btnRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = e => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = e => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="v2h-dd" ref={rootRef}>
      <button
        ref={btnRef}
        type="button"
        className="v2h-link v2h-dd-btn"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(o => !o)}
      >
        {nav.services}
        <svg className={`v2h-chevron ${open ? 'is-open' : ''}`} width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      {open && (
        <div className="v2h-menu" id={menuId}>
          {nav.serviceLinks.map(s => (
            <Link key={s.href} to={s.href} className="v2h-menu-link" onClick={() => setOpen(false)}>
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileMenu({ open, onClose }) {
  const sheetRef = useRef(null)

  // body scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // escape to close + simple focus trap
  useEffect(() => {
    if (!open) return
    const sheet = sheetRef.current
    const focusables = () =>
      sheet ? [...sheet.querySelectorAll('a[href], button:not([disabled])')] : []
    focusables()[0]?.focus()
    const onKey = e => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault() }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="v2h-sheet" role="dialog" aria-modal="true" aria-label="Site menu" ref={sheetRef}>
      <div className="v2h-sheet-top">
        <span className="v2h-sheet-brand">
          <img src="/icon-192.png" alt="" aria-hidden="true" />
          {brand.name}
        </span>
        <button type="button" className="v2h-iconbtn" onClick={onClose} aria-label={nav.menuClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>

      <nav className="v2h-sheet-nav" aria-label="Mobile">
        <div className="v2h-sheet-group">{nav.services}</div>
        {nav.serviceLinks.map(s => (
          <Link key={s.href} to={s.href} className="v2h-sheet-link v2h-sheet-sub" onClick={onClose}>{s.label}</Link>
        ))}
        <div className="v2h-sheet-rule" />
        <Link to={nav.coverage.href} className="v2h-sheet-link" onClick={onClose}>{nav.coverage.label}</Link>
        <a href={nav.why.href} className="v2h-sheet-link" onClick={onClose}>{nav.why.label}</a>
        <Link to={nav.contact.href} className="v2h-sheet-link" onClick={onClose}>{nav.contact.label}</Link>
      </nav>

      <div className="v2h-sheet-actions">
        <Link to={nav.requestCta.href} className="v2-btn v2-btn-primary" onClick={onClose}>{nav.requestCta.label}</Link>
        <a href={brand.phoneHref} className="v2-btn v2-btn-secondary" onClick={onClose}>
          {nav.callLabel} {brand.phoneDisplay}
        </a>
        <p className="v2h-sheet-notice">{emergencyNotice}</p>
      </div>
    </div>
  )
}

export default function HeaderV2() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the sheet when the route changes (guarded render-time adjust)
  const [prevLocation, setPrevLocation] = useState(location)
  if (location !== prevLocation) {
    setPrevLocation(location)
    if (menuOpen) setMenuOpen(false)
  }

  return (
    <div className="v2">
      <header className="v2h" role="banner">
        <div className="v2h-bar v2-container-wide">
          <Link to="/" className="v2h-brand">
            <img src="/icon-192.png" alt="" aria-hidden="true" />
            <span>{brand.name}</span>
          </Link>

          <nav className="v2h-nav" aria-label="Primary">
            <ServicesDropdown />
            <Link to={nav.coverage.href} className="v2h-link">{nav.coverage.label}</Link>
            <a href={nav.why.href} className="v2h-link">{nav.why.label}</a>
            <Link to={nav.contact.href} className="v2h-link">{nav.contact.label}</Link>
          </nav>

          <div className="v2h-actions">
            <a href={brand.phoneHref} className="v2h-phone" aria-label={`${nav.callLabel} ${brand.phoneDisplay}`}>
              {brand.phoneDisplay}
            </a>
            <Link to={nav.requestCta.href} className="v2-btn v2-btn-primary v2h-cta">{nav.requestCta.label}</Link>
            <button
              type="button"
              className="v2h-iconbtn v2h-burger"
              aria-label={nav.menuOpen}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>

        {/* Emergency notice: discreet strip under the header bar */}
        <p className="v2h-notice v2-small">
          <span className="v2-container-wide">{emergencyNotice}</span>
        </p>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Persistent mobile action bar (retained V1 conversion pattern, restyled) */}
      <div className="v2h-mobilebar">
        <a href={brand.phoneHref} className="v2h-mobilebar-call">{brand.phoneDisplay}</a>
        <Link to={nav.requestCta.href} className="v2h-mobilebar-request">{nav.requestCta.label}</Link>
      </div>
    </div>
  )
}
