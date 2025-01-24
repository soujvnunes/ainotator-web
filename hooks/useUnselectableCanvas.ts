import { useEffect } from 'react'
import useCanvasRefs from './useCanvasRefs'
import useAppState from './useAppState'

export default function useUnselectableCanvas() {
  const annotatorRefs = useCanvasRefs()
  const category = useAppState((state) => state.annotator.current.category)

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
