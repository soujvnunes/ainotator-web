'use client'

import {
  useBrush,
  useInitializeCanvas,
  useGenerateAnnotation,
  usePolygon,
  useUnselectCanvas,
} from '@/hooks'

import Onboarding from './onboarding'

const CONTROLS_Y =
  64 + // TOOLBAR
  40 // HEADER

export default function Canvas() {
  const canvasId = useInitializeCanvas({ offset: { y: CONTROLS_Y } })

  useUnselectCanvas()
  useBrush()
  usePolygon()
  useGenerateAnnotation()

  return (
    <div className="group relative h-[calc(100vh-104px)] bg-black transition-[background-color] hover:bg-white/5">
      <Onboarding />
      <canvas id={canvasId} />
    </div>
  )
}
