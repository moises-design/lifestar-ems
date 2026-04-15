import './Insurance.css'

const insurers = [
  { name: 'BlueCross BlueShield', logo: '/images/bcbs.svg' },
  { name: 'Molina Healthcare', logo: '/images/molina.svg' },
  { name: 'Ambetter', logo: '/images/ambetter.svg' },
  { name: 'United Healthcare', logo: '/images/uhc.svg' },
  { name: 'Cigna', logo: '/images/cigna.svg' },
  { name: 'Humana', logo: '/images/humana.svg' },
  { name: 'Wellcare / Allwell', logo: '/images/wellcare.svg' },
  { name: 'Aetna', logo: '/images/aetna.svg' },
  { name: "Driscoll Children's", logo: '/images/driscoll.svg' },
  { name: 'Healthspring', logo: '/images/healthspring.svg' },
  { name: 'Superior Healthplan', logo: '/images/superior.svg' },
  { name: 'Medicare', logo: '/images/medicare.svg' },
  { name: 'Medicaid / CSHCN', logo: '/images/medicaid.svg' },
  { name: 'Private Insurance', logo: '/images/private.svg' },
]

export default function Insurance() {
  return (
    <section className="insurance" id="insurance">
      <div className="container">
        <div className="insurance-header">
          <span className="section-label">We Work With</span>
          <h2 className="section-title">Insurance<br /><em>We Accept</em></h2>
          <p className="section-sub">
            We work with most major insurance providers so you can focus on your health —
            not the paperwork. Call us for a{' '}
            <strong style={{ color: 'var(--blue-light)' }}>FREE evaluation</strong>.
          </p>
        </div>
        <div className="insurance-grid">
          {insurers.map((ins, i) => (
            <div className="insurance-badge" key={i}>
              <img src={ins.logo} alt={ins.name} className="ins-logo-img" />
              <span className="ins-name">{ins.name}</span>
            </div>
          ))}
        </div>
        <div className="insurance-cta">
          <p>Don't see your insurance? Call us — we'll verify your coverage for FREE</p>
          <a href="tel:9566606543" className="ins-btn">
            📞 Call (956) 660-6543 — Free Evaluation
          </a>
        </div>
      </div>
    </section>
  )
}
