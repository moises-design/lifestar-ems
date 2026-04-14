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

function App() {
  return (
    <>
      <EmergencyBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Coverage />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
