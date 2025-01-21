'use client'

import getDatasetAnnotation from '@/helpers/getDatasetAnnotation'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { Canvas } from 'fabric'
import type { TPointerEvent, TPointerEventInfo } from 'fabric'
import { useCallback } from 'react'
import AnnotatorCanvasUploader from './AnnotatorCanvasUploader'
import { twMerge } from 'tailwind-merge'
import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'

export default function AnnotatorCanvas() {
  const annotatorRefs = useAnnotatorRefs()
  const file = useAnnotatorState((state) => state.annotator.file)
  const dispatch = useAnnotatorDispatch()
  const handleCanvas = useCallback((node: HTMLCanvasElement) => {
    const canvas = new Canvas(node.id, {
      width: window.innerWidth,
      // TODO: move 64 (toolbar's height) to the design system
      height: window.innerHeight - 64,
    })

    function handleMouseUp() {
      const datasetAnnotation = getDatasetAnnotation(canvas, {
        isCrowded: false,
        id: {
          image: 0, // TODO: dynamically when image is setted
          category: 0, // TODO: dynamically when class is setted
          annotation: 0, // TODO: dynamically when mouse's up
        },
      })

      if (datasetAnnotation) dispatch.addAnnotation(datasetAnnotation)
    }
    function handleMouseMove(event: TPointerEventInfo<TPointerEvent>) {
      const viewportPoint = canvas.getViewportPoint(event.e)
      const image = annotatorRefs.image.current

      if (image == null) return

      /* TODO: move image around using the offset size

 console.log(
        'move',
        viewportPoint,
        image.width - canvas.width,
        viewportPoint.x - image.width / 2,
      )
        
      */
    }

    canvas.on({
      'mouse:up': handleMouseUp,
      'mouse:move': handleMouseMove,
    })

    annotatorRefs.canvas.current = canvas

    return () => {
      canvas.dispose()
      canvas.off({
        'mouse:up': handleMouseUp,
        'mouse:move': handleMouseMove,
      })
    }
  }, [])

  return (
    <div
      className={twMerge(
        'relative bg-neutral-900 transition-[background-color] h-[calc(100vh-64px)]',
        !file && 'hover:bg-neutral-900/60',
      )}>
      <AnnotatorCanvasUploader />
      <canvas
        id="ainotator"
        ref={handleCanvas}
      />
    </div>
  )
}
