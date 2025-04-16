'use client'

import { useEffect, useState } from 'react'

import { Line, Point, Polygon, util, type TPointerEvent, type TPointerEventInfo } from 'fabric'

import annotatorSlice from '@/slices/annotatorSlice'

import useCanvas from './useCanvas'
import useEnhancedId from './useEnhancedId'
import useStoreState from './useStoreState'

export default function usePolygon() {
  const canvas = useCanvas()
  const currentCategory = useStoreState(annotatorSlice.selectors.currentCategory)
  const isAnnotating = useStoreState(annotatorSlice.selectors.isAnnotating)
  const [id, nextId] = useEnhancedId()
  const [lines, setLines] = useState<Line[]>([])
  const [isDrawing, setDrawing] = useState(false)
  const [points, setPoints] = useState<Record<'x' | 'y', number>[]>([])

  useEffect(() => {
    const _canvas = canvas.current
    const defaultOptions = { selectable: false, hasControls: false }

    if (!_canvas || !isAnnotating || currentCategory?.type !== 'polygon') {
      return
    }

    function handleMouseDown(event: TPointerEventInfo<TPointerEvent>) {
      if (!_canvas) return

      const viewportPoint = _canvas.getViewportPoint(event.e)
      const pointer = new Point(viewportPoint.x, viewportPoint.y).transform(
        util.invertTransform(_canvas.viewportTransform),
      )

      setPoints((prevPoints) => [...prevPoints, { x: pointer.x, y: pointer.y }])

      if (!!points.length) {
        const point = points[points.length - 1]
        const line = new Line([point.x, point.y, pointer.x, pointer.y], {
          stroke: currentCategory?.color,
          strokeWidth: 2,
          ...defaultOptions,
        })

        _canvas.add(line)
        setLines((prevLines) => [...prevLines, line])
      }
    }
    function handleMouseMove(event: TPointerEventInfo<TPointerEvent>) {
      if (!isDrawing || !lines.length || !_canvas) return

      const viewportPoint = _canvas.getViewportPoint(event.e)
      const pointer = new Point(viewportPoint.x, viewportPoint.y).transform(
        util.invertTransform(_canvas.viewportTransform),
      )

      lines[lines.length - 1].set({ x2: pointer.x, y2: pointer.y })
      _canvas.renderAll()
    }
    function handleDoubleClick() {
      if (points.length <= 2 || !_canvas) return

      const polygon = new Polygon(points, {
        fill: currentCategory?.color,
        ...defaultOptions,
      })

      polygon.set({ id })
      _canvas.add(polygon)
      nextId()

      setPoints([])
      setLines([])
      setDrawing(false)
    }

    _canvas.on('mouse:down', handleMouseDown)
    _canvas.on('mouse:move', handleMouseMove)
    _canvas.on('mouse:dblclick', handleDoubleClick)

    return () => {
      _canvas.off('mouse:down', handleMouseDown)
      _canvas.off('mouse:move', handleMouseMove)
      _canvas.off('mouse:dblclick', handleDoubleClick)
    }
  }, [lines, isDrawing, points, id, currentCategory, nextId, canvas, isAnnotating])
}
