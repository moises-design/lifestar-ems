import { Routes, Route } from 'react-router-dom'
import './App.css'

import ScrollToTop from './components/ScrollToTop'
import Seo from './components/Seo'

// V2 chrome (all routes)
import HeaderV2 from './v2/Header'
import FooterV2 from './v2/Footer'
import HomeV2 from './v2/HomeV2'

// Pages
import DialysisTransport from './pages/DialysisTransport'
import TherapyTransport from './pages/TherapyTransport'
import PediatricsTransport from './pages/PediatricsTransport'
import EventStandby from './pages/EventStandby'
import RequestCoverage from './pages/RequestCoverage'
import CoveragePage from './pages/CoveragePage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'
import GovernmentContracting from './pages/GovernmentContracting'

function App() {
  return (
    <>
      <ScrollToTop />
      <Seo />
      <a href="#main" className="skip-link">Skip to main content</a>
      <HeaderV2 />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomeV2 />} />
          <Route path="/services/dialysis" element={<DialysisTransport />} />
          <Route path="/services/therapy" element={<TherapyTransport />} />
          <Route path="/services/pediatrics" element={<PediatricsTransport />} />
          <Route path="/services/events" element={<EventStandby />} />
          <Route path="/request" element={<RequestCoverage />} />
          <Route path="/coverage" element={<CoveragePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/government-contracting" element={<GovernmentContracting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <FooterV2 />
    </>
  )
}

export default App
