import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { useEffect } from 'react'

export default function useUnselectableCanvas() {
  const annotatorRefs = useAnnotatorRefs()
  const category = useAnnotatorState(
    (state) => state.annotator.current.category,
  )

  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    if (canvas == null) return

    canvas.isDrawingMode = false
    canvas.selection = false
    canvas.forEachObject((obj) => {
      obj.selectable = false
      obj.hasControls = false
    })
    canvas.renderAll()
  }, [annotatorRefs, category])
}
