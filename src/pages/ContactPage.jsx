import Contact from '../components/Contact'
import InnerPage from '../v2/InnerPage'
import { content } from '../v2/content'

export default function ContactPage() {
  return (
    <InnerPage {...content.pages.contact} legacy>
      <Contact />
    </InnerPage>
  )
}
