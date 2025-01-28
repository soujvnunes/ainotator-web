import { Radio, RadioGroup } from '@headlessui/react'

import radioFieldStyles from './styles'

interface RadioFieldProps<V extends string>
  extends Omit<React.ComponentPropsWithRef<'input'>, 'onChange'> {
  values: { value: V; children?: React.ReactNode; label: string }[]
  defaultValue?: V
}

export default function RadioField<V extends string>({
  className,
  values,
  ...props
}: RadioFieldProps<V>) {
  return (
    <RadioGroup
      className={radioFieldStyles.root({ className })}
      {...props}>
      {values.map((radioProps) => (
        <Radio
          key={radioProps.value}
          value={radioProps.value}
          aria-label={
            typeof radioProps.children === 'undefined'
              ? undefined
              : radioProps.label
          }
          className={radioFieldStyles.radio}>
          {radioProps.children ?? radioProps.label}
        </Radio>
      ))}
    </RadioGroup>
  )
}
