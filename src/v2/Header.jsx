import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { content } from './content'
import { gov } from './content/government'
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

// `onClose` just closes the sheet (used by nav-link clicks, where focus should
// move on naturally with the route change). `onDismiss` closes AND returns
// keyboard focus to the trigger button (used by Escape and the X button).
function MobileMenu({ open, onClose, onDismiss }) {
  const sheetRef = useRef(null)

  // body scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // escape to close (+ restore focus to the trigger) + simple focus trap
  useEffect(() => {
    if (!open) return
    const sheet = sheetRef.current
    const focusables = () =>
      sheet ? [...sheet.querySelectorAll('a[href], button:not([disabled])')] : []
    focusables()[0]?.focus()
    const onKey = e => {
      if (e.key === 'Escape') { onDismiss(); return }
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
  }, [open, onDismiss])

  if (!open) return null

  return (
    <div className="v2 v2h-sheet" role="dialog" aria-modal="true" aria-label="Site menu" ref={sheetRef}>
      <div className="v2h-sheet-top">
        <span className="v2h-sheet-brand">
          <img src="/icon-192.png" alt="" aria-hidden="true" />
          {brand.name}
        </span>
        <button type="button" className="v2h-iconbtn" onClick={onDismiss} aria-label={nav.menuClose}>
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
        <Link to={gov.route} className="v2h-sheet-link" onClick={onClose}>{gov.navLabel}</Link>
        <Link to={nav.why.href} className="v2h-sheet-link" onClick={onClose}>{nav.why.label}</Link>
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
  const burgerRef = useRef(null)

  // Close the sheet when the route changes (guarded render-time adjust)
  const [prevLocation, setPrevLocation] = useState(location)
  if (location !== prevLocation) {
    setPrevLocation(location)
    if (menuOpen) setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)
  const dismissMenu = () => {
    setMenuOpen(false)
    burgerRef.current?.focus()
  }

  return (
    <>
      {/* The header itself carries the .v2 design-system scope and is a
          direct sibling of <main>, so its containing block for `position:
          sticky` spans the full page height instead of a shrink-wrapped
          wrapper (which previously stopped the header from staying pinned
          past its own height). */}
      <header className="v2 v2h" role="banner">
        <div className="v2h-bar v2-container-wide">
          <Link to="/" className="v2h-brand">
            <img src="/icon-192.png" alt="" aria-hidden="true" />
            <span>{brand.name}</span>
          </Link>

          <nav className="v2h-nav" aria-label="Primary">
            <ServicesDropdown />
            <Link to={nav.coverage.href} className="v2h-link">{nav.coverage.label}</Link>
            <Link to={gov.route} className="v2h-link">{gov.navLabel}</Link>
            <Link to={nav.why.href} className="v2h-link">{nav.why.label}</Link>
            <Link to={nav.contact.href} className="v2h-link">{nav.contact.label}</Link>
          </nav>

          <div className="v2h-actions">
            <a href={brand.phoneHref} className="v2h-phone" aria-label={`${nav.callLabel} ${brand.phoneDisplay}`}>
              {brand.phoneDisplay}
            </a>
            <Link to={nav.requestCta.href} className="v2-btn v2-btn-primary v2h-cta">{nav.requestCta.label}</Link>
            <button
              ref={burgerRef}
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

      <MobileMenu open={menuOpen} onClose={closeMenu} onDismiss={dismissMenu} />

      {/* Persistent mobile action bar (retained V1 conversion pattern,
          restyled). Hidden on /request, where it would duplicate the form. */}
      {location.pathname !== '/request' && (
        <div className="v2 v2h-mobilebar">
          <a href={brand.phoneHref} className="v2h-mobilebar-call">{brand.phoneDisplay}</a>
          <Link to={nav.requestCta.href} className="v2h-mobilebar-request">{nav.requestCta.label}</Link>
        </div>
      )}
    </>
  )
}
