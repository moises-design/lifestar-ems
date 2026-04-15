import { Routes, Route } from 'react-router-dom'
import './App.css'

import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import FloatingNav from './components/FloatingNav'
import Footer from './components/Footer'

// Homepage sections
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import CoverageMap from './components/CoverageMap'
import Contact from './components/Contact'

// Pages
import DialysisTransport from './pages/DialysisTransport'
import TherapyTransport from './pages/TherapyTransport'
import PediatricsTransport from './pages/PediatricsTransport'
import EventStandby from './pages/EventStandby'
import RequestCoverage from './pages/RequestCoverage'
import CoveragePage from './pages/CoveragePage'
import ContactPage from './pages/ContactPage'

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <CoverageMap />
      <Contact />
    </>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <FloatingNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/dialysis" element={<DialysisTransport />} />
          <Route path="/services/therapy" element={<TherapyTransport />} />
          <Route path="/services/pediatrics" element={<PediatricsTransport />} />
          <Route path="/services/events" element={<EventStandby />} />
          <Route path="/request" element={<RequestCoverage />} />
          <Route path="/coverage" element={<CoveragePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
