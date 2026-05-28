'use client'

import { useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface FlickeringGridProps {
  className?: string
  squareSize?: number
  gridGap?: number
  color?: string
  maxOpacity?: number
  flickerChance?: number
}

export function FlickeringGrid({
  className,
  squareSize = 4,
  gridGap = 6,
  color = '99,102,241',
  maxOpacity = 0.25,
  flickerChance = 0.07,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return null

      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      const step = squareSize + gridGap
      const cols = Math.ceil(rect.width / step) + 1
      const rows = Math.ceil(rect.height / step) + 1
      const squares = new Float32Array(cols * rows).map(() => Math.random() * maxOpacity)

      return { ctx, cols, rows, squares, width: rect.width, height: rect.height }
    },
    [squareSize, gridGap, maxOpacity]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let state = setupCanvas(canvas)
    if (!state) return

    const handleResize = () => {
      state = setupCanvas(canvas)
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(canvas)

    const draw = () => {
      if (!state) return
      const { ctx, cols, rows, squares, width, height } = state
      ctx.clearRect(0, 0, width, height)

      const step = squareSize + gridGap
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j
          if (Math.random() < flickerChance) {
            squares[idx] = Math.random() * maxOpacity
          }
          ctx.fillStyle = `rgba(${color},${squares[idx]})`
          ctx.fillRect(i * step, j * step, squareSize, squareSize)
        }
      }
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [setupCanvas, squareSize, gridGap, color, maxOpacity, flickerChance])

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none', className)}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
