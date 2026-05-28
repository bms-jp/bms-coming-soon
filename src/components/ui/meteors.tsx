'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface MeteorsProps {
  number?: number
  className?: string
}

interface Meteor {
  id: number
  top: number
  left: number
  delay: number
  duration: number
  angle: number
}

export function Meteors({ number = 12, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id: i,
        top: Math.random() * 70,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 4,
        angle: -30 + Math.random() * 20,
      }))
    )
  }, [number])

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-px w-[140px] animate-meteor opacity-0"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            /* Use CSS rotate property (doesn't conflict with translateX animation) */
            rotate: `${m.angle}deg`,
            background: 'linear-gradient(90deg, rgba(129,140,248,0.7), transparent)',
            boxShadow: '0 0 4px 0px rgba(129,140,248,0.3)',
          }}
        />
      ))}
    </div>
  )
}
