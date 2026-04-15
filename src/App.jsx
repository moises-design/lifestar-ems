import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Coverage from './components/Coverage'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingNav from './components/FloatingNav'

import DialysisTransport from './pages/DialysisTransport'
import TherapyTransport from './pages/TherapyTransport'
import PediatricsTransport from './pages/PediatricsTransport'
import EventStandby from './pages/EventStandby'
import RequestCoverage from './pages/RequestCoverage'

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Coverage />
      <Contact />
    </>
  )
}

function App() {
  return (
    <>
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
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
