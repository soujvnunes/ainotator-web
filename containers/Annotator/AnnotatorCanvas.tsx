'use client'

import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { Canvas, PencilBrush } from 'fabric'
import { useEffect, useId } from 'react'
import AnnotatorCanvasUploader from './AnnotatorCanvasUploader'
import { twMerge } from 'tailwind-merge'
import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'
import { TOOLBAR_Y } from './annotatorToolbar.utils'
import getDatasetAnnotation from '@/helpers/getDatasetAnnotation'

export default function AnnotatorCanvas() {
  const annotatorRefs = useAnnotatorRefs()
  const dispatch = useAnnotatorDispatch()
  const mode = useAnnotatorState((state) => state.annotator.mode)
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
  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    if (canvas == null) return

    if (mode.name !== 'annotating') {
      const datasetAnnotation = getDatasetAnnotation(canvas, {
        isCrowded: false,
        id: {
          image: 0, // TODO: dynamically when image is set
          category: 0, // TODO: dynamically when class is set
          annotation: 0, // TODO: dynamically when mouse is up
        },
      })

      if (datasetAnnotation) dispatch.dataset.addAnnotation(datasetAnnotation)

      canvas.isDrawingMode = false
    } else {
      if (mode.category.type === 'brush') {
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush = new PencilBrush(canvas)
        canvas.freeDrawingBrush.color = `rgb(${mode.category.color} / 0.4)`
        // TODO: size
        canvas.freeDrawingBrush.width = 20
      } else if (mode.category.type === 'polygon') {
        // TODO: polygon
      }
    }
  })

  return (
    <div
      style={{ height: `calc(100vh - ${TOOLBAR_Y}px)` }}
      className={twMerge(
        'relative bg-neutral-900 transition-[background-color]',
        mode.name === 'waiting' && 'hover:bg-neutral-900/60',
      )}>
      <AnnotatorCanvasUploader />
      <canvas id={canvasId} />
    </div>
  )
}
