// Single icon-rendering surface for the whole V2 system. Every card/list
// icon should go through this component instead of a raw <Icon /> or
// emoji, so sizing, containment, and screen-reader treatment stay
// consistent everywhere. Icons are decorative by default (aria-hidden);
// pass `label` only when the icon carries meaning no adjacent text
// already provides.
export default function AccessibleIcon(props) {
  const { size = 22, label, className = '', tone = 'default' } = props
  const Icon = props.icon
  return (
    <span
      className={`v2-icon v2-icon-${tone} ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      <Icon size={size} aria-hidden="true" focusable="false" />
    </span>
  )
}
