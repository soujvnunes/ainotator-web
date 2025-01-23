'use client'

import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { Canvas } from 'fabric'
import { useCallback } from 'react'
import AnnotatorCanvasUploader from './AnnotatorCanvasUploader'
import { twMerge } from 'tailwind-merge'
import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import { TOOLBAR_Y } from './annotatorToolbar.utils'

export default function AnnotatorCanvas() {
  const annotatorRefs = useAnnotatorRefs()
  const name = useAnnotatorState((state) => state.annotator.mode.name)
  const handleCanvas = useCallback((node: HTMLCanvasElement) => {
    const canvas = new Canvas(node.id, {
      width: window.innerWidth,
      height: window.innerHeight - TOOLBAR_Y,
    })

    annotatorRefs.canvas.current = canvas

    return () => {
      canvas.dispose()
      annotatorRefs.canvas.current = null
    }
  }, [])

  return (
    <div
      style={{ height: `calc(100vh - ${TOOLBAR_Y}px)` }}
      className={twMerge(
        'relative bg-neutral-900 transition-[background-color]',
        name === 'waiting' && 'hover:bg-neutral-900/60',
      )}>
      <AnnotatorCanvasUploader />
      <canvas
        id="ainotator"
        ref={handleCanvas}
      />
    </div>
  )
}
