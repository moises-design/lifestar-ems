import { FaPhone, FaExclamationTriangle } from 'react-icons/fa'
import './EmergencyBar.css'

export default function EmergencyBar() {
  return (
    <div className="emergency-bar">
      <FaExclamationTriangle className="eb-icon" />
      <span className="eb-text">Medical Emergency?</span>
      <a href="tel:911" className="eb-911">Call 911</a>
      <span className="eb-divider">|</span>
      <span className="eb-text">Non-Emergency Dispatch:</span>
      <a href="tel:9566489774" className="eb-phone">
        <FaPhone className="eb-phone-icon" />
        (956) 648-9774
      </a>
    </div>
  )
}
