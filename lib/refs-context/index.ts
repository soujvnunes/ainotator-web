'use client'

import { createContext, createRef } from 'react'

import type { Canvas, FabricImage } from 'fabric'

interface RefsContextProps {
  canvas: React.RefObject<Canvas | null>
  image: React.RefObject<FabricImage | null>
  file: React.RefObject<HTMLInputElement | null>
}

const RefsContext = createContext<RefsContextProps>({
  canvas: createRef<Canvas>(),
  image: createRef<FabricImage>(),
  file: createRef<HTMLInputElement>(),
})

export default RefsContext
