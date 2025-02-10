'use client'

import { useId } from 'react'

import { Field, Input, Label } from '@headlessui/react'

import { twMerge } from '@/helpers'

import textFieldStyles from './styles'

export interface TextFieldProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  disabled?: boolean
  invalid?: {
    when: boolean
    message: string
  }
}

export { textFieldStyles }
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
      className={twMerge(textFieldStyles.root({ className }))}>
      <Label className={textFieldStyles.label.root}>
        {label}
        {props.required && (
          <span className={textFieldStyles.label.required}> *</span>
        )}
      </Label>
      <Input
        type={type}
        invalid={invalid?.when}
        aria-description={errorMessageId}
        aria-errormessage={errorMessageId}
        className={textFieldStyles.input()}
        {...props}
      />
      <p
        aria-live="polite"
        className={textFieldStyles.invalid.message}
        id={errorMessageId}>
        {invalid?.when && invalid?.message}
      </p>
    </Field>
  )
}
