'use client'

import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'
import { Field, Input, Label } from '@headlessui/react'
import { useCallback } from 'react'

function translateX(input: number) {
  return ((160 - 0) / (40 - 10)) * (input - 10)
}
function translateY(input: number) {
  return -0.5 * input + 20
}

export default function HeaderControlsSize() {
  const mode = useAnnotatorState((state) => state.annotator.current.mode)
  const size = useAnnotatorState((state) => state.annotator.current.size.brush)
  const dispatch = useAnnotatorDispatch()
  const handleSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch.annotator.setSize({ brush: +event.target.value })
    },
    [],
  )
  const max = 40

  return (
    <Field
      disabled={mode !== 'annotating'}
      className="relative inline-flex items-center w-40 h-10 mx-5 group">
      <Label className="sr-only">Brush size</Label>
      <Input
        className="w-full opacity-0 cursor-pointer group-data-[disabled]:cursor-not-allowed"
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
          className="h-[10px] top-[15px] absolute w-full bg-neutral-800"
        />
        <button
          type="button"
          data-range-type="thumb"
          className="absolute w-[--size] h-[--size] group-data-[disabled]:bg-neutral-600 bg-white top-[--top] left-[--left]"
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
