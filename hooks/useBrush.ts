import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { PencilBrush } from 'fabric'
import { useEffect } from 'react'

export default function useBrush() {
  const annotatorRefs = useAnnotatorRefs()
  const category = useAnnotatorState(
    (state) => state.annotator.current.category,
  )

  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    if (canvas == null) return

    canvas.isDrawingMode = false

    if (category?.type !== 'brush') return

    canvas.isDrawingMode = true
    canvas.freeDrawingBrush = new PencilBrush(canvas)
    canvas.freeDrawingBrush.color = `rgb(${category.color} / 0.4)`
    // TODO: size
    canvas.freeDrawingBrush.width = 20
  })
}
