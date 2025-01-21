'use client'

import type { Canvas, FabricImage } from 'fabric'
import { createContext, createRef, useContext, useRef, useState } from 'react'

interface AnnotatorRefsContextProps {
  canvas: React.RefObject<Canvas | null>
  image: React.RefObject<FabricImage | null>
}

const AnnotatorRefsContext = createContext<AnnotatorRefsContextProps>({
  canvas: createRef<Canvas>(),
  image: createRef<FabricImage>(),
})

export function useAnnotatorRefs() {
  return useContext(AnnotatorRefsContext)
}
export default function AnnotatorRefsProvider(props: React.PropsWithChildren) {
  const canvas = useRef<Canvas>(null)
  const image = useRef<FabricImage>(null)
  const [value] = useState(() => ({ canvas, image }))

  return (
    <AnnotatorRefsContext
      value={value}
      {...props}
    />
  )
}
