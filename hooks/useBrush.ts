import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { PencilBrush } from 'fabric'
import { useEffect } from 'react'

export default function useBrush() {
  const annotatorRefs = useAnnotatorRefs()
  const mode = useAnnotatorState((state) => state.annotator.mode)

  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    if (canvas == null) return

    if (mode.name !== 'annotating') {
      canvas.isDrawingMode = false
    } else if (mode.category.type === 'brush') {
      canvas.isDrawingMode = true
      canvas.freeDrawingBrush = new PencilBrush(canvas)
      canvas.freeDrawingBrush.color = `rgb(${mode.category.color} / 0.4)`
      // TODO: size
      canvas.freeDrawingBrush.width = 20
    }
  })
}
