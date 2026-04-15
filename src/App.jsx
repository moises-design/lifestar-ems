import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Coverage from './components/Coverage'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EmergencyBar from './components/EmergencyBar'
import Insurance from './components/Insurance'
import LongDistance from './components/LongDistance'
import DialysisTransport from './pages/DialysisTransport'
import TherapyTransport from './pages/TherapyTransport'
import PediatricsTransport from './pages/PediatricsTransport'
import LongDistanceTransport from './pages/LongDistanceTransport'
import EventStandby from './pages/EventStandby'

function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Insurance />
      <Coverage />
      <LongDistance />
      <Gallery />
      <Contact />
    </main>
  )
}

function App() {
  return (
    <>
      <EmergencyBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/dialysis" element={<DialysisTransport />} />
        <Route path="/services/therapy" element={<TherapyTransport />} />
        <Route path="/services/pediatrics" element={<PediatricsTransport />} />
        <Route path="/services/long-distance" element={<LongDistanceTransport />} />
        <Route path="/services/event-standby" element={<EventStandby />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
