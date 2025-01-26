'use client'

import { useId } from 'react'

import { Field, Input, Label } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

import fieldText from './FieldText.styles'

export interface FieldTextProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'type'> {
  label: string
  disabled?: boolean
  invalid?: {
    when: boolean
    message: string
  }
}

export default function FieldText({
  label,
  invalid,
  className,
  disabled,
  ...props
}: FieldTextProps) {
  const errorMessageId = useId()

  return (
    <Field
      disabled={disabled}
      className={twMerge(fieldText.root({ className }))}>
      <Label className={fieldText.label}>
        {label}
        {props.required && <span className="text-red-400"> *</span>}
      </Label>
      <Input
        type="text"
        invalid={invalid?.when}
        aria-description={errorMessageId}
        aria-errormessage={errorMessageId}
        className={fieldText.input}
        {...props}
      />
      <p
        aria-live="polite"
        className={fieldText.invalid.message}
        id={errorMessageId}>
        {invalid?.when && invalid?.message}
      </p>
    </Field>
  )
}
