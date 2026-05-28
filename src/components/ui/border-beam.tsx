import { cn } from '@/lib/utils'

interface BorderBeamProps {
  className?: string
  duration?: number
  colorFrom?: string
  colorTo?: string
}

export function BorderBeam({
  className,
  duration = 10,
  colorFrom = '#818cf8',
  colorTo = '#c084fc',
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden',
        className
      )}
      aria-hidden
    >
      <div
        className="absolute inset-[-100%] animate-border-beam"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 15%, ${colorTo} 35%, transparent 50%, transparent 100%)`,
          animationDuration: `${duration}s`,
        }}
      />
      <div className="absolute inset-[1px] rounded-[inherit] bg-[#111118]" />
    </div>
  )
}
