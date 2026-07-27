import AccessibleIcon from './AccessibleIcon'

// A row of short, verified facts (e.g. "Ground BLS transport", "Edinburg,
// Texas"). Every `value`/`label` pair must come from a verified source —
// this component renders whatever it is given, it does not itself
// enforce fact accuracy. See docs/SEO-FACT-VERIFICATION.md.
export default function FactsStrip({ items, className = '' }) {
  return (
    <ul className={`v2-facts-strip ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          {item.icon && <AccessibleIcon icon={item.icon} size={20} />}
          <span className="v2-facts-value">{item.value}</span>
          <span className="v2-facts-label">{item.label}</span>
        </li>
      ))}
    </ul>
  )
}
