import './Insurance.css'

const insurances = [
  'BlueCross BlueShield',
  'Molina Healthcare',
  'Ambetter',
  'United Healthcare',
  'Cigna',
  'Humana',
  'Wellcare / Allwell',
  'Aetna',
  "Driscoll Children's Healthplan",
  'Healthspring',
  'Superior Healthplan',
  'Medicare',
  'Medicaid Traditional',
  'Medicaid CSHCN',
  'Private Insurance',
]

export default function Insurance() {
  return (
    <section className="insurance-section" id="insurance">
      <div className="container">
        <div className="ins-header">
          <span className="section-label">Coverage &amp; Billing</span>
          <h2 className="section-title">Insurance <em>We Accept</em></h2>
          <p className="section-sub">
            We work directly with most major insurance providers across Texas.
            Don't see yours? Call us — we'll work with you.
          </p>
        </div>
        <div className="ins-grid">
          {insurances.map(ins => (
            <div key={ins} className="ins-badge">
              <span className="ins-check">✓</span>
              {ins}
            </div>
          ))}
        </div>
        <div className="ins-footer">
          <a href="tel:9566606543" className="ins-cta">
            📞 Questions about billing? Call (956) 660-6543
          </a>
        </div>
      </div>
    </section>
  )
}
