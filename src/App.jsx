import { Routes, Route } from 'react-router-dom'
import './App.css'

import EmergencyBar from './components/EmergencyBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Insurance from './components/Insurance'
import Coverage from './components/Coverage'
import LongDistanceCities from './components/LongDistanceCities'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingNav from './components/FloatingNav'

import DialysisTransport from './pages/DialysisTransport'
import TherapyTransport from './pages/TherapyTransport'
import PediatricsTransport from './pages/PediatricsTransport'
import LongDistanceTransport from './pages/LongDistanceTransport'
import EventStandby from './pages/EventStandby'

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Insurance />
      <Coverage />
      <LongDistanceCities />
      <Gallery />
      <Contact />
    </>
  )
}

function App() {
  return (
    <>
      <EmergencyBar />
      <Navbar />
      <FloatingNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/dialysis" element={<DialysisTransport />} />
          <Route path="/services/therapy" element={<TherapyTransport />} />
          <Route path="/services/pediatrics" element={<PediatricsTransport />} />
          <Route path="/services/long-distance" element={<LongDistanceTransport />} />
          <Route path="/services/event-standby" element={<EventStandby />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
