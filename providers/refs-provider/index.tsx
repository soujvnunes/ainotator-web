'use client'

import { useRef, useState } from 'react'

import type { Canvas, FabricImage } from 'fabric'

import { RefsContext } from '@/lib'

export default function RefsProvider(props: {
  readonly children: React.ReactNode
}) {
  const canvas = useRef<Canvas>(null)
  const image = useRef<FabricImage>(null)
  const file = useRef<HTMLInputElement>(null)
  const [value] = useState(() => ({
    canvas,
    image,
    file,
  }))

  return (
    <RefsContext
      value={value}
      {...props}
    />
  )
}
