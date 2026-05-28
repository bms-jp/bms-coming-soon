'use client'

import { useCallback, useRef } from 'react'

export function useSpotlight() {
  const elRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = elRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(129,140,248,0.05), transparent 70%)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = elRef.current
    if (!el) return
    el.style.background = 'transparent'
  }, [])

  return { elRef, handleMouseMove, handleMouseLeave }
}
