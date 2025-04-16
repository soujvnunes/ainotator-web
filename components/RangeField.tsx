'use client'

import { Field, Input, Label } from '@headlessui/react'

import useRangeFieldPosition from '@/hooks/useRangeFieldPosition'

import rangeField from '@/styles/rangeField'

interface RangeFieldProps extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'value'> {
  label: string
  value: number
}

export default function RangeField({ className, disabled, value, label, ...props }: RangeFieldProps) {
  const position = useRangeFieldPosition(value, props)

  return (
    <Field
      disabled={disabled}
      className={rangeField.root({ className })}>
      <Label className={rangeField.label}>{label}</Label>
      <Input
        type="range"
        value={value}
        className={rangeField.input()}
        {...props}
      />
      <div
        aria-hidden
        className={rangeField.resizer.root()}>
        <div
          data-field-element="track"
          className={rangeField.resizer.track()}
        />
        <button
          type="button"
          data-field-element="thumb"
          className={rangeField.resizer.thumb()}
          style={{
            width: value,
            height: value,
            top: position.y,
            left: position.x,
          }}
        />
      </div>
    </Field>
  )
}
