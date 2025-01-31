'use client'

import { useMemo } from 'react'

import { Field, Input, Label } from '@headlessui/react'

import { getLeftPosition, getTopPosition, max, min } from './lib'
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
  const xPos = useMemo(() => getTopPosition(value), [value])
  const yPos = useMemo(() => getLeftPosition(value), [value])

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
