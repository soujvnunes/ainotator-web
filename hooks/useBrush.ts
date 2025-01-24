import { PencilBrush } from 'fabric'
import { useEffect } from 'react'
import useAppState from './useAppState'
import useCanvasRefs from './useCanvasRefs'

export default function useBrush() {
  const annotatorRefs = useCanvasRefs()
  const size = useAppState((state) => state.annotator.current.size.brush)
  const category = useAppState((state) => state.annotator.current.category)

  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    if (canvas == null || category?.type !== 'brush') return

    canvas.isDrawingMode = true
    canvas.freeDrawingBrush = new PencilBrush(canvas)
    canvas.freeDrawingBrush.color = `rgb(${category.color} / 0.4)`
    canvas.freeDrawingBrush.width = size
  }, [annotatorRefs, category, size])
}
