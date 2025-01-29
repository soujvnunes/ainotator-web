import { useEffect } from 'react'

import useAppState from './useAppState'
import useCanvasRefs from './useCanvasRefs'

export default function useUnselectableCanvas() {
  const annotatorRefs = useCanvasRefs()
  const id = useAppState((state) => state.annotator.current.category.id)

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
  }, [annotatorRefs, id])
}
