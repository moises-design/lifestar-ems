import CoverageMap from '../components/CoverageMap'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'

export default function CoveragePage() {
  return (
    <InnerPage {...content.pages.coverage} legacy>
      <CoverageMap />
    </InnerPage>
  )
}
