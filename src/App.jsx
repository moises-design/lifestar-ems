import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

import ScrollToTop from './components/ScrollToTop'
import Seo from './components/Seo'

// V1 chrome (service pages keep it until Mission 7)
import Navbar from './components/Navbar'
import FloatingNav from './components/FloatingNav'
import Footer from './components/Footer'

// V2 chrome + homepage shell
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

function App() {
  const { pathname } = useLocation()
  // The homepage runs on the V2 shell; every other route keeps the V1
  // chrome untouched until Mission 7 migrates them.
  const isV2Route = pathname === '/'

  return (
    <>
      <ScrollToTop />
      <Seo />
      <a href="#main" className="skip-link">Skip to main content</a>
      {isV2Route ? <HeaderV2 /> : <><Navbar /><FloatingNav /></>}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isV2Route ? <FooterV2 /> : <Footer />}
    </>
  )
}

export default App
