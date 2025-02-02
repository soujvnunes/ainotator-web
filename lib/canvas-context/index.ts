'use client'

import { createContext, createRef } from 'react'

import type { Canvas } from 'fabric'

type CanvasContextProps = React.RefObject<Canvas | null>

const CanvasContext = createContext<CanvasContextProps>(createRef<Canvas>())

export default CanvasContext
