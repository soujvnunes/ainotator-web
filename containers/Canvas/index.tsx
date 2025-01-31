'use client'

import { cx } from '@/helpers'

import {
  useBrush,
  useCanvas,
  useGenerateAnnotation,
  usePolygon,
  useStoreState,
  useUnselectCanvas,
} from '@/hooks'

import Uploader from './uploader'

const CONTROLS_Y =
  64 + // TOOLBAR
  40 // HEADER

const bgXs = cx(
  'absolute inset-0 h-full bg-[url(/rapport.png)] from-black/20 to-black/0 bg-repeat opacity-0 [mask-image:radial-gradient(circle_at_center,_var(--tw-gradient-stops))] data-[waiting]:opacity-100',
)

export default function Canvas() {
  const mode = useStoreState((state) => state.annotator.mode)
  const canvasId = useCanvas({ offset: { y: CONTROLS_Y } })

  useUnselectCanvas()
  useBrush()
  usePolygon()
  useGenerateAnnotation()

  return (
    <div className="group relative h-[calc(100vh-104px)] bg-black transition-[background-color] hover:bg-white/5">
      <Uploader />
      <div {...bgXs({ waiting: mode === 'waiting' })} />
      <canvas id={canvasId} />
    </div>
  )
}
