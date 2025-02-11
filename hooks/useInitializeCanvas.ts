'use client'

import { useEffect, useId } from 'react'

import { Canvas } from 'fabric'

import useCanvas from './useCanvas'

interface CanvasArgs {
  offset: {
    y: number
  }
}

export default function useInitializeCanvas(props: CanvasArgs) {
  const canvas = useCanvas()
  const id = useId()

  useEffect(() => {
    canvas.current = new Canvas(id, {
      width: window.innerWidth,
      height: window.innerHeight - props.offset.y,
    })

    return () => {
      canvas.current?.dispose()
    }
  }, [id, props.offset.y, canvas])

  return id
}
