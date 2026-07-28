import './RouteLoading.css'

// Suspense fallback shown briefly while a route's JS chunk downloads.
// Announced politely to assistive tech, and never renders as a large
// blank region — just a small centered indicator in the content area.
export default function RouteLoading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading-spinner" aria-hidden="true" />
      <span className="route-loading-text">Loading…</span>
    </div>
  )
}
