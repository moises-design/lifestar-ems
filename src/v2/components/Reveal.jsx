import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Lightweight scroll-reveal wrapper: adds `.is-visible` once the element
// enters the viewport, letting CSS handle the actual fade/rise transition.
// No animation library — a single IntersectionObserver per instance.
// Content renders visible immediately under reduced motion or when
// IntersectionObserver is unavailable, so it never fails to "just show it".
export default function Reveal(props) {
  const Tag = props.as || 'div'
  const { className = '', children, as: _as, ...rest } = props
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => prefersReducedMotion() || typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag ref={ref} className={`v2-reveal ${visible ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
