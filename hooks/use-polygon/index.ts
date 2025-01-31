'use client'

import { useEffect, useState } from 'react'

import {
  Line,
  Point,
  Polygon,
  util,
  type TPointerEvent,
  type TPointerEventInfo,
} from 'fabric'

import useCurrentCategory from '../use-current-category'
import useEnhancedId from '../use-enhanced-id'
import useRefs from '../use-refs'
import useStoreState from '../use-store-state'

export default function usePolygon() {
  const refs = useRefs()
  const category = useCurrentCategory()
  const mode = useStoreState((state) => state.annotator.mode)
  const [id, nextId] = useEnhancedId()
  const [lines, setLines] = useState<Line[]>([])
  const [isDrawing, setDrawing] = useState(false)
  const [points, setPoints] = useState<Record<'x' | 'y', number>[]>([])

  useEffect(() => {
    const canvas = refs.canvas.current
    const defaultOptions = { selectable: false, hasControls: false }

    if (!canvas || mode !== 'annotating' || category?.type !== 'polygon') return

    function handleMouseDown(event: TPointerEventInfo<TPointerEvent>) {
      if (!canvas) return

      const viewportPoint = canvas.getViewportPoint(event.e)
      const pointer = new Point(viewportPoint.x, viewportPoint.y).transform(
        util.invertTransform(canvas.viewportTransform),
      )

      setPoints((prevPoints) => [...prevPoints, { x: pointer.x, y: pointer.y }])

      if (!!points.length) {
        const point = points[points.length - 1]
        const line = new Line([point.x, point.y, pointer.x, pointer.y], {
          stroke: category?.color,
          strokeWidth: 2,
          ...defaultOptions,
        })

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
    function handleDoubleClick() {
      if (points.length <= 2 || !canvas) return

      const polygon = new Polygon(points, {
        fill: category?.color,
        ...defaultOptions,
      })

      polygon.set({ id })
      canvas.add(polygon)
      nextId()

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
  }, [lines, isDrawing, points, id, category, refs, mode, nextId])
}
