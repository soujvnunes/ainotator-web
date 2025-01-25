'use client'

import { useRef, useState } from 'react'

import CanvasRefsContext from '@/lib/CanvasRefsContext'
import type { Canvas, FabricImage } from 'fabric'

export default function CanvasRefsProvider(props: React.PropsWithChildren) {
  const canvas = useRef<Canvas>(null)
  const image = useRef<FabricImage>(null)
  const file = useRef<HTMLInputElement>(null)
  const [value] = useState(() => ({
    canvas,
    image,
    file,
  }))

  return (
    <CanvasRefsContext
      value={value}
      {...props}
    />
  )
}
