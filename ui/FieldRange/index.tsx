'use client'

import { useCallback } from 'react'

import { Field, Input, Label } from '@headlessui/react'

import fieldRangeStyles from './styles'

interface FieldRangeProps
  extends Omit<
    React.ComponentPropsWithRef<'input'>,
    'type' | 'max' | 'min' | 'value'
  > {
  label: string
  value: number
}

export default function FieldRange({
  className,
  disabled,
  value,
  label,
  ...props
}: FieldRangeProps) {
  const max = 40
  const min = 8
  const handleXPosition = useCallback(
    (input?: FieldRangeProps['value']) => {
      if (typeof input === 'undefined') return 0

      return ((160 - 0) / (+max - +min)) * (+input - +min) - +input / 2
    },
    [max, min],
  )
  const handleYPosition = useCallback(
    (input?: FieldRangeProps['value']) => {
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
      className={fieldRangeStyles.root({ className })}>
      <Label className={fieldRangeStyles.label}>{label}</Label>
      <Input
        type="range"
        max={max}
        min={min}
        value={value}
        className={fieldRangeStyles.input()}
        {...props}
      />
      <div
        aria-hidden
        className={fieldRangeStyles.resizer.root()}>
        <div
          data-field-element="track"
          className={fieldRangeStyles.resizer.track()}
        />
        <button
          type="button"
          data-field-element="thumb"
          className={fieldRangeStyles.resizer.thumb()}
          style={{ width: value, height: value, top: yPos, left: xPos }}
        />
      </div>
    </Field>
  )
}
