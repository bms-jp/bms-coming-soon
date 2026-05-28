import { cn } from '@/lib/utils'

interface AnimatedShinyTextProps {
  children: React.ReactNode
  className?: string
  shimmerWidth?: number
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  return (
    <span
      className={cn(
        'animate-shiny-text bg-clip-text text-transparent',
        className
      )}
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0.55) 100%)',
          backgroundSize: '200% auto',
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  )
}
