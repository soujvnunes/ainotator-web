'use client'

import { useEffect, useId } from 'react'

import { Canvas } from 'fabric'

import useRefs from '../use-refs'

interface CanvasArgs {
  offset: {
    y: number
  }
}

export default function useCanvas(props: CanvasArgs) {
  const annotatorRefs = useRefs()
  const id = useId()

  useEffect(() => {
    annotatorRefs.canvas.current = new Canvas(id, {
      width: window.innerWidth,
      height: window.innerHeight - props.offset.y,
    })

    return () => {
      annotatorRefs.canvas.current?.dispose()
    }
  }, [annotatorRefs.canvas, id, props.offset.y])

  return id
}
