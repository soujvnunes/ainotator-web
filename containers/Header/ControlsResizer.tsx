'use client'

import { useCallback } from 'react'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import { Field, Input, Label } from '@headlessui/react'

function translateX(input: number) {
  return ((160 - 0) / (40 - 10)) * (input - 10)
}
function translateY(input: number) {
  return -0.5 * input + 20
}

export default function ControlsResizer() {
  const mode = useAppState((state) => state.annotator.current.mode)
  const category = useAppState((state) => state.annotator.current.category)
  const size = useAppState((state) => state.annotator.current.size.brush)
  const dispatch = useAppDispatch()
  const handleSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch.annotator.setSize({ brush: +event.target.value })
    },
    [dispatch.annotator],
  )
  const max = 40

  return (
    <Field
      disabled={mode !== 'annotating' || category?.type !== 'brush'}
      className="group relative mx-5 inline-flex h-10 w-40 items-center">
      <Label className="sr-only">Brush size</Label>
      <Input
        className="w-full cursor-pointer opacity-0 group-data-[disabled]:cursor-not-allowed"
        type="range"
        min={10}
        max={max}
        value={size}
        onChange={handleSize}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10">
        <div
          data-range-type="track"
          className="absolute top-[15px] h-[10px] w-full bg-neutral-800"
        />
        <button
          type="button"
          data-range-type="thumb"
          className="absolute left-[--left] top-[--top] h-[--size] w-[--size] bg-white group-data-[disabled]:bg-neutral-600"
          style={
            {
              '--size': `${size}px`,
              '--top': `${translateY(size)}px`,
              '--left': `${translateX(size) - size / 2}px`,
            } as React.CSSProperties
          }
        />
      </div>
    </Field>
  )
}
