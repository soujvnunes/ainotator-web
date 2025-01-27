'use client'

import { useId } from 'react'

import { Field, Input, Label } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

import fieldTextStyles from './styles'

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
      className={twMerge(fieldTextStyles.root({ className }))}>
      <Label className={fieldTextStyles.label.root()}>
        {label}
        {props.required && (
          <span className={fieldTextStyles.label.required}> *</span>
        )}
      </Label>
      <Input
        type="text"
        invalid={invalid?.when}
        aria-description={errorMessageId}
        aria-errormessage={errorMessageId}
        className={fieldTextStyles.input}
        {...props}
      />
      <p
        aria-live="polite"
        className={fieldTextStyles.invalid.message()}
        id={errorMessageId}>
        {invalid?.when && invalid?.message}
      </p>
    </Field>
  )
}
