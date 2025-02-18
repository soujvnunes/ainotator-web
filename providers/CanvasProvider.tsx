'use client'

import { useRef } from 'react'

import type { Canvas } from 'fabric'

import CanvasContext from '@/lib/CanvasContext'

export default function CanvasProvider(props: {
  readonly children: React.ReactNode
}) {
  const canvas = useRef<Canvas>(null)

  return (
    <CanvasContext
      value={canvas}
      {...props}
    />
  )
}
