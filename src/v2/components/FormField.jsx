// Accessible labeled form control: explicit <label htmlFor>, optional
// hint tied via aria-describedby, and an error message exposed with
// role="alert" so assistive tech announces it immediately.
export default function FormField({
  id,
  label,
  as = 'input',
  type = 'text',
  required = false,
  error,
  hint,
  children,
  className = '',
  ...rest
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`v2-field ${error ? 'v2-field-invalid' : ''} ${className}`}>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {hint && <span className="v2-field-hint" id={hintId}>{hint}</span>}
      {as === 'select' ? (
        <select id={id} required={required} aria-describedby={describedBy} aria-invalid={!!error} {...rest}>
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea id={id} required={required} aria-describedby={describedBy} aria-invalid={!!error} {...rest} />
      ) : (
        <input id={id} type={type} required={required} aria-describedby={describedBy} aria-invalid={!!error} {...rest} />
      )}
      {error && (
        <span className="v2-field-error" id={errorId} role="alert">{error}</span>
      )}
    </div>
  )
}
