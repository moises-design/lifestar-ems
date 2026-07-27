import { Link } from 'react-router-dom'
import CoverageMap from '../components/CoverageMap'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'

export default function CoveragePage() {
  return (
    <InnerPage
      {...content.pages.coverage}
      breadcrumb={[{ label: 'Coverage' }]}
      legacy
      cta={
        <>
          <Link to="/request" className="v2-btn v2-btn-primary">Request Transport</Link>
          <a href="tel:+19566606543" className="v2-btn v2-btn-secondary">Call dispatch (956) 660-6543</a>
        </>
      }
    >
      <CoverageMap />
    </InnerPage>
  )
}
