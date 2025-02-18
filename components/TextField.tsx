'use client'

import { useId } from 'react'

import { Field, Input, Label } from '@headlessui/react'

import twMerge from '@/helpers/twMerge'

import textField from '@/styles/textField'

type TextFieldInvalidProp = [when: boolean, message: string]
export interface TextFieldProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  disabled?: boolean
  invalid?: TextFieldInvalidProp | TextFieldInvalidProp[]
}

function isInvalidProp(
  invalid: TextFieldProps['invalid'],
): invalid is TextFieldInvalidProp {
  return (
    Array.isArray(invalid) &&
    typeof invalid[0] === 'boolean' &&
    typeof invalid[1] === 'string'
  )
}
function resolveInvalid(invalid: TextFieldProps['invalid']) {
  if (!Array.isArray(invalid)) return

  return (
    isInvalidProp(invalid) ? [invalid] : invalid
  ) as TextFieldInvalidProp[]
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
  const resolvedInvalid = resolveInvalid(invalid)

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
        className={textField.input()}
        aria-description={errorMessageId}
        aria-errormessage={errorMessageId}
        invalid={resolvedInvalid?.map(([when]) => when).some(Boolean)}
        {...props}
      />
      {resolvedInvalid?.map(([when, message]) => (
        <p
          aria-live="polite"
          key={message}
          id={errorMessageId}
          className={textField.invalid.message}>
          {when && message}
        </p>
      ))}
    </Field>
  )
}
