'use client'

import { Canvas as FabricCanvas } from 'fabric'
import { useEffect, useId } from 'react'
import CanvasUploader from './CanvasUploader'
import { twMerge } from 'tailwind-merge'
import usePolygon from '@/hooks/usePolygon'
import useBrush from '@/hooks/useBrush'
import useUnselectableCanvas from '@/hooks/useUnselectableCanvas'
import useAppState from '@/hooks/useAppState'
import useCanvasRefs from '@/hooks/useCanvasRefs'

const CONTROLS_Y =
  64 + // TOOLBAR
  40 // HEADER

export default function Canvas() {
  const mode = useAppState((state) => state.annotator.current.mode)
  const annotatorRefs = useCanvasRefs()
  const canvasId = useId()

  useEffect(() => {
    annotatorRefs.canvas.current = new FabricCanvas(canvasId, {
      width: window.innerWidth,
      height: window.innerHeight - CONTROLS_Y,
    })

    return () => {
      annotatorRefs.canvas.current?.dispose()
    }
  }, [canvasId])
  useUnselectableCanvas()
  useBrush()
  usePolygon()

  return (
    <div
      style={{ height: `calc(100vh - ${CONTROLS_Y}px)` }}
      className={twMerge(
        'relative bg-black group transition-[background-color]',
        mode === 'waiting' && 'hover:bg-white/5',
      )}>
      <CanvasUploader />
      {mode === 'waiting' && (
        <div className="from-black/20 absolute inset-0 to-black/0 h-full bg-[url(/rapport.png)] bg-repeat [mask-image:radial-gradient(circle_at_center,_var(--tw-gradient-stops))]" />
      )}
      <canvas id={canvasId} />
    </div>
  )
}
