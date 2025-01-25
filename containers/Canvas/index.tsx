'use client'

import { useEffect, useId } from 'react'

import useAppState from '@/hooks/useAppState'
import useBrush from '@/hooks/useBrush'
import useCanvasRefs from '@/hooks/useCanvasRefs'
import usePolygon from '@/hooks/usePolygon'
import useUnselectableCanvas from '@/hooks/useUnselectableCanvas'
import { Canvas as FabricCanvas } from 'fabric'
import { twMerge } from 'tailwind-merge'

import Uploader from './Uploader'

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
  }, [annotatorRefs.canvas, canvasId])
  useUnselectableCanvas()
  useBrush()
  usePolygon()

  return (
    <div
      style={{ height: `calc(100vh - ${CONTROLS_Y}px)` }}
      className={twMerge(
        'group relative bg-black transition-[background-color]',
        mode === 'waiting' && 'hover:bg-white/5',
      )}>
      <Uploader />
      <div
        className={twMerge(
          'absolute inset-0 h-full bg-[url(/rapport.png)] from-black/20 to-black/0 bg-repeat opacity-0 [mask-image:radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
          mode === 'waiting' && 'opacity-100',
        )}
      />
      <canvas id={canvasId} />
    </div>
  )
}
