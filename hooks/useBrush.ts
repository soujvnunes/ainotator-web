import { useEffect } from 'react'

import { PencilBrush } from 'fabric'

import useAppState from './useAppState'
import useCanvasRefs from './useCanvasRefs'

export default function useBrush() {
  const annotatorRefs = useCanvasRefs()
  const size = useAppState((state) => state.annotator.current.size.brush)
  const mode = useAppState((state) => state.annotator.current.mode)
  const category = useAppState((state) => state.annotator.current.category)

  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    if (canvas == null || mode !== 'annotating' || category?.type !== 'brush')
      return

    canvas.isDrawingMode = true
    canvas.freeDrawingBrush = new PencilBrush(canvas)
    canvas.freeDrawingBrush.color = `rgb(${category.color} / 0.4)`
    canvas.freeDrawingBrush.width = size
  }, [annotatorRefs, category, mode, size])
}
