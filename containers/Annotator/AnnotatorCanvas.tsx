'use client'

import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { Canvas } from 'fabric'
import { useEffect, useId } from 'react'
import AnnotatorCanvasUploader from './AnnotatorCanvasUploader'
import { twMerge } from 'tailwind-merge'
import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import { TOOLBAR_Y } from './annotatorToolbar.utils'
import usePolygon from '@/hooks/usePolygon'
import useBrush from '@/hooks/useBrush'
import useUnselectableCanvas from '@/hooks/useUnselectableCanvas'

export default function AnnotatorCanvas() {
  const mode = useAnnotatorState((state) => state.annotator.current.mode)
  const annotatorRefs = useAnnotatorRefs()
  const canvasId = useId()

  useEffect(() => {
    annotatorRefs.canvas.current = new Canvas(canvasId, {
      width: window.innerWidth,
      height: window.innerHeight - TOOLBAR_Y,
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
      style={{ height: `calc(100vh - ${TOOLBAR_Y}px)` }}
      className={twMerge(
        'relative bg-neutral-900 transition-[background-color]',
        mode === 'waiting' && 'hover:bg-neutral-900/60',
      )}>
      <AnnotatorCanvasUploader />
      <canvas id={canvasId} />
    </div>
  )
}
