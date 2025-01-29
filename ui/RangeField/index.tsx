'use client'

import { useCallback } from 'react'

import { Field, Input, Label } from '@headlessui/react'

import rangeFieldStyles from './styles'

interface RangeFieldProps
  extends Omit<
    React.ComponentPropsWithRef<'input'>,
    'type' | 'max' | 'min' | 'value'
  > {
  label: string
  value: number
}

export default function RangeField({
  className,
  disabled,
  value,
  label,
  ...props
}: RangeFieldProps) {
  const max = 40
  const min = 8
  const handleXPosition = useCallback(
    (input?: RangeFieldProps['value']) => {
      if (typeof input === 'undefined') return 0

      return ((160 - 0) / (+max - +min)) * (+input - +min) - +input / 2
    },
    [max, min],
  )
  const handleYPosition = useCallback(
    (input?: RangeFieldProps['value']) => {
      if (typeof input === 'undefined') return 0

      return -0.5 * +input + +max / 2
    },
    [max],
  )
  const yPos = handleYPosition(value)
  const xPos = handleXPosition(value)

  return (
    <Field
      disabled={disabled}
      className={rangeFieldStyles.root({ className })}>
      <Label className={rangeFieldStyles.label}>{label}</Label>
      <Input
        type="range"
        max={max}
        min={min}
        value={value}
        className={rangeFieldStyles.input()}
        {...props}
      />
      <div
        aria-hidden
        className={rangeFieldStyles.resizer.root()}>
        <div
          data-field-element="track"
          className={rangeFieldStyles.resizer.track()}
        />
        <button
          type="button"
          data-field-element="thumb"
          className={rangeFieldStyles.resizer.thumb()}
          style={{ width: value, height: value, top: yPos, left: xPos }}
        />
      </div>
    </Field>
  )
}
