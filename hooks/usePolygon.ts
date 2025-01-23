import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { Line, Point, Polygon, util } from 'fabric'
import type { TPointerEvent, TPointerEventInfo } from 'fabric'
import { useEffect, useId, useState } from 'react'

// TODO: not finishing when closes
export default function usePolygon() {
  const annotatorRefs = useAnnotatorRefs()
  const category = useAnnotatorState(
    (state) => state.annotator.current.category,
  )
  const id = useId()
  const [lines, setLines] = useState<Line[]>([])
  const [isDrawing, setDrawing] = useState(false)
  const [points, setPoints] = useState<Record<'x' | 'y', number>[]>([])

  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    if (canvas == null || category?.type !== 'polygon') return

    const color = `rgb(${category.color} / 0.4)`

    function handleMouseDown(event: TPointerEventInfo<TPointerEvent>) {
      if (!canvas) return

      const viewportPoint = canvas.getViewportPoint(event.e)
      const pointer = new Point(viewportPoint.x, viewportPoint.y).transform(
        util.invertTransform(canvas.viewportTransform),
      )

      setPoints((prevPoints) => [...prevPoints, { x: pointer.x, y: pointer.y }])

      if (!!points.length) {
        const line = new Line(
          [
            points[points.length - 1].x,
            points[points.length - 1].y,
            pointer.x,
            pointer.y,
          ],
          {
            stroke: color,
            strokeWidth: 2,
            selectable: false,
            hasControls: false,
          },
        )
        canvas.add(line)
        setLines((prevLines) => [...prevLines, line])
      }
    }
    function handleMouseMove(event: TPointerEventInfo<TPointerEvent>) {
      if (!isDrawing || !lines.length || !canvas) return

      const viewportPoint = canvas.getViewportPoint(event.e)
      const pointer = new Point(viewportPoint.x, viewportPoint.y).transform(
        util.invertTransform(canvas.viewportTransform),
      )

      lines[lines.length - 1].set({ x2: pointer.x, y2: pointer.y })
      canvas.renderAll()
    }
    function handleDoubleClick(event: TPointerEventInfo<TPointerEvent>) {
      if (points.length <= 2 || !canvas) return

      const polygon = new Polygon(points, {
        fill: color,
      })

      polygon.set({ id })
      canvas.add(polygon)

      setPoints([])
      setLines([])
      setDrawing(false)
    }

    canvas.on('mouse:down', handleMouseDown)
    canvas.on('mouse:move', handleMouseMove)
    canvas.on('mouse:dblclick', handleDoubleClick)

    return () => {
      canvas.off('mouse:down', handleMouseDown)
      canvas.off('mouse:move', handleMouseMove)
      canvas.off('mouse:dblclick', handleDoubleClick)
    }
  })
}
