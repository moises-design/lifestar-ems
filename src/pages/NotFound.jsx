import { Link } from 'react-router-dom'
import { FaHome, FaEnvelope, FaPhone } from 'react-icons/fa'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="nf-page">
      <div className="container nf-inner">
        <img src="/images/logo-icon.png" alt="Life Star EMS" className="nf-logo" />
        <p className="nf-code">404</p>
        <h1 className="nf-title">Page Not Found</h1>
        <p className="nf-text">
          The page you are looking for does not exist or may have moved.
          Use the links below to get back on track.
        </p>
        <div className="nf-btns">
          <Link to="/" className="btn btn-blue"><FaHome /> Back to Home</Link>
          <Link to="/contact" className="btn btn-outline"><FaEnvelope /> Contact Us</Link>
          <a href="tel:9566606543" className="btn btn-outline"><FaPhone /> (956) 660-6543</a>
        </div>
      </div>
    </div>
  )
}
