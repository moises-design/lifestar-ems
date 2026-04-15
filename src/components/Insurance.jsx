import './Insurance.css'

const insurers = [
  { name: 'BlueCross BlueShield', icon: '🔵' },
  { name: 'Molina Healthcare', icon: '🟢' },
  { name: 'Ambetter', icon: '🔷' },
  { name: 'United Healthcare', icon: '🔵' },
  { name: 'Cigna', icon: '🟦' },
  { name: 'Humana', icon: '🟢' },
  { name: 'Wellcare / Allwell', icon: '💙' },
  { name: 'Aetna', icon: '🔴' },
  { name: 'Driscoll Children\'s', icon: '👶' },
  { name: 'Healthspring', icon: '💚' },
  { name: 'Superior Healthplan', icon: '⭐' },
  { name: 'Medicare', icon: '🏥' },
  { name: 'Medicaid Traditional', icon: '🏛️' },
  { name: 'Medicaid CSHCN', icon: '♿' },
  { name: 'Private Insurance', icon: '🛡️' },
]

export default function Insurance() {
  return (
    <section className="insurance">
      <div className="container">
        <div className="insurance-header">
          <span className="section-label">We Work With</span>
          <h2 className="section-title">
            Insurance<br /><em>We Accept</em>
          </h2>
          <p className="section-sub">
            We work with most major insurance providers so you can focus on your health —
            not the paperwork. Call us for a <strong style={{color:'var(--blue-light)'}}>FREE evaluation</strong>.
          </p>
        </div>

        <div className="insurance-grid">
          {insurers.map((ins, i) => (
            <div className="insurance-badge" key={i}>
              <span className="ins-icon">{ins.icon}</span>
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
