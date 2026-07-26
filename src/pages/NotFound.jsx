import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="v2">
      <div className="nf-page">
        <div className="v2-container nf-inner">
          <img src="/icon-192.png" alt="" aria-hidden="true" className="nf-logo" />
          <p className="v2-label">404</p>
          <h1 className="nf-title">Page not found</h1>
          <p className="nf-text v2-lead">
            The page you are looking for does not exist or may have moved.
            Use the links below to get back on track.
          </p>
          <div className="nf-btns">
            <Link to="/" className="v2-btn v2-btn-primary">Back to Home</Link>
            <Link to="/contact" className="v2-btn v2-btn-secondary">Contact Us</Link>
            <a href="tel:+19566606543" className="v2-btn v2-btn-secondary">(956) 660-6543</a>
          </div>
        </div>
      </div>
    </div>
  )
}
