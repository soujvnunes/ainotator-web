import { createContext, createRef } from 'react'

import type { Canvas, FabricImage } from 'fabric'

export interface AnnotatorRefsContextProps {
  canvas: React.RefObject<Canvas | null>
  image: React.RefObject<FabricImage | null>
  file: React.RefObject<HTMLInputElement | null>
}

const CanvasRefsContext = createContext<AnnotatorRefsContextProps>({
  canvas: createRef<Canvas>(),
  image: createRef<FabricImage>(),
  file: createRef<HTMLInputElement>(),
})

export default CanvasRefsContext
