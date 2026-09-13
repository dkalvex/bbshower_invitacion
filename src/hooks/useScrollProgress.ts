import { useEffect } from 'react'

/**
 * Publishes each section's vertical progress as a `--p` custom property
 * (1 = below the viewport, 0 = pinned at the top, -1 = above it),
 * which the stylesheet uses to drift the decorative clouds.
 */
export function useScrollProgress() {
  useEffect(() => {
    const update = () => {
      document.querySelectorAll<HTMLElement>('section').forEach((section) => {
        const { top } = section.getBoundingClientRect()
        const progress = Math.max(-1, Math.min(1, top / window.innerHeight))
        section.style.setProperty('--p', progress.toFixed(3))
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
}
