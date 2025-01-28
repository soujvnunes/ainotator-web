'use client'

import { createContext, createRef, useContext, useRef, useState } from 'react'

import type { Canvas, FabricImage } from 'fabric'

interface AnnotatorRefsContextProps {
  canvas: React.RefObject<Canvas | null>
  image: React.RefObject<FabricImage | null>
  file: React.RefObject<HTMLInputElement | null>
}

const CanvasRefsContext = createContext<AnnotatorRefsContextProps>({
  canvas: createRef<Canvas>(),
  image: createRef<FabricImage>(),
  file: createRef<HTMLInputElement>(),
})

export function CanvasRefsProvider(props: React.PropsWithChildren) {
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
export default function useCanvasRefs() {
  return useContext(CanvasRefsContext)
}
