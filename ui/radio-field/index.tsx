import { Radio, RadioGroup, RadioGroupProps } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

import radioFieldStyles from './styles'

interface RadioFieldProps<V extends string | number>
  extends RadioGroupProps<'div', V> {
  values: { value: V; children: React.ReactNode; label?: string }[]
  vertical?: boolean
}

export default function RadioField<V extends string | number>({
  className,
  values,
  vertical,
  ...props
}: RadioFieldProps<V>) {
  return (
    <RadioGroup
      className={radioFieldStyles.root({ className, vertical })}
      {...props}>
      {values.map(({ label, children, ...radioProps }) => (
        <Radio
          key={radioProps.value}
          defaultChecked={props.defaultValue === radioProps.value}
          className={twMerge(radioFieldStyles.radio.root({ vertical }))}
          aria-label={vertical ? undefined : label}
          {...radioProps}>
          {vertical && (
            <div className={radioFieldStyles.radio.button.root}>
              <CheckIcon className={radioFieldStyles.radio.button.icon} />
            </div>
          )}
          {children}
        </Radio>
      ))}
    </RadioGroup>
  )
}
