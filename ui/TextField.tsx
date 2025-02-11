'use client'

import { useId } from 'react'

import { Field, Input, Label } from '@headlessui/react'

import twMerge from '@/helpers/twMerge'

import textField from '@/styles/textField'

export interface TextFieldProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  disabled?: boolean
  invalid?: {
    when: boolean
    message: string
  }
}

export default function TextField({
  label,
  invalid,
  className,
  type = 'text',
  disabled,
  ...props
}: TextFieldProps) {
  const errorMessageId = useId()

  return (
    <Field
      disabled={disabled}
      className={twMerge(textField.root({ className }))}>
      <Label className={textField.label.root}>
        {label}
        {props.required && <span className={textField.label.required}> *</span>}
      </Label>
      <Input
        type={type}
        invalid={invalid?.when}
        aria-description={errorMessageId}
        aria-errormessage={errorMessageId}
        className={textField.input()}
        {...props}
      />
      <p
        aria-live="polite"
        className={textField.invalid.message}
        id={errorMessageId}>
        {invalid?.when && invalid?.message}
      </p>
    </Field>
  )
}
