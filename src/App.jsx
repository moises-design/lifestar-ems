import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import ScrollToTop from './components/ScrollToTop'
import Seo from './components/Seo'
import RouteLoading from './components/RouteLoading'

// V2 chrome (all routes) and the homepage stay in the main bundle: this is
// the most likely landing page, so there is no benefit to splitting it out.
import HeaderV2 from './v2/Header'
import FooterV2 from './v2/Footer'
import HomeV2 from './v2/HomeV2'

// Every other route is code-split: a visitor to any one page only
// downloads that page's JS, not the whole site's.
const About = lazy(() => import('./pages/About'))
const ServicesOverview = lazy(() => import('./pages/ServicesOverview'))
const DialysisTransport = lazy(() => import('./pages/DialysisTransport'))
const TherapyTransport = lazy(() => import('./pages/TherapyTransport'))
const PediatricsTransport = lazy(() => import('./pages/PediatricsTransport'))
const EventStandby = lazy(() => import('./pages/EventStandby'))
const LongDistanceTransport = lazy(() => import('./pages/LongDistanceTransport'))
const RequestCoverage = lazy(() => import('./pages/RequestCoverage'))
const CoveragePage = lazy(() => import('./pages/CoveragePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const GovernmentContracting = lazy(() => import('./pages/GovernmentContracting'))
const Sitemap = lazy(() => import('./pages/Sitemap'))
const Privacy = lazy(() => import('./pages/Privacy'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Seo />
      <a href="#main" className="skip-link">Skip to main content</a>
      <HeaderV2 />
      <main id="main">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<HomeV2 />} />
            <Route path="/services" element={<ServicesOverview />} />
            <Route path="/services/dialysis" element={<DialysisTransport />} />
            <Route path="/services/therapy" element={<TherapyTransport />} />
            <Route path="/services/pediatrics" element={<PediatricsTransport />} />
            <Route path="/services/events" element={<EventStandby />} />
            <Route path="/services/long-distance" element={<LongDistanceTransport />} />
            <Route path="/request" element={<RequestCoverage />} />
            <Route path="/about" element={<About />} />
            <Route path="/coverage" element={<CoveragePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/government-contracting" element={<GovernmentContracting />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <FooterV2 />
    </>
  )
}

export default App
