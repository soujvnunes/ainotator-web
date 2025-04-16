'use client'

import { useRef } from 'react'

import type { Canvas } from 'fabric'

import CanvasContext from '@/lib/CanvasContext'

export default function CanvasProvider({ children }: React.PropsWithChildren) {
  const canvas = useRef<Canvas>(null)

  return <CanvasContext value={canvas}>{children}</CanvasContext>
}
