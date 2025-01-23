import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { PencilBrush } from 'fabric'
import { useEffect } from 'react'

export default function useBrush() {
  const annotatorRefs = useAnnotatorRefs()
  const category = useAnnotatorState(
    (state) => state.annotator.current.category,
  )
  const size = useAnnotatorState((state) => state.annotator.current.size.brush)

  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    if (canvas == null || category?.type !== 'brush') return

    canvas.isDrawingMode = true
    canvas.freeDrawingBrush = new PencilBrush(canvas)
    canvas.freeDrawingBrush.color = `rgb(${category.color} / 0.4)`
    canvas.freeDrawingBrush.width = size
  }, [annotatorRefs, category, size])
}
