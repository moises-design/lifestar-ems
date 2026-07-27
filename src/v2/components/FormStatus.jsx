import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import AccessibleIcon from './AccessibleIcon'

// The shared success/error state for every form on the site, replacing
// the emoji (✅) success markers that were previously hardcoded per page.
// role="status" (success) / role="alert" (error) so screen readers
// announce the outcome without the user needing to find it visually.
export default function FormStatus({ state, title, children }) {
  if (state !== 'success' && state !== 'error') return null
  const isSuccess = state === 'success'
  return (
    <div className={`v2-form-status v2-form-status-${state}`} role={isSuccess ? 'status' : 'alert'}>
      <AccessibleIcon icon={isSuccess ? FaCheckCircle : FaExclamationCircle} tone={state} size={22} />
      <div>
        <p className="v2-form-status-title">{title}</p>
        {children && <p>{children}</p>}
      </div>
    </div>
  )
}
