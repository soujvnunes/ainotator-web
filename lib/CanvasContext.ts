'use client'

import { createContext, createRef } from 'react'

import type { Canvas } from 'fabric'

type CanvasContextProps = React.RefObject<Canvas | null>

export default createContext<CanvasContextProps>(createRef<Canvas>())
