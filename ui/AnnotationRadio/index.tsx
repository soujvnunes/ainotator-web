'use client'

import { Label, Radio } from '@headlessui/react'
import {
  CubeTransparentIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

import annotationRadioStyles from './styles'

export interface AnnotationRadioProps<V extends string>
  extends Omit<React.ComponentPropsWithRef<'input'>, 'value'> {
  type: 'brush' | 'polygon'
  isCrowd: 'yes' | 'no'
  value: V
  color:
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose'
    | 'neutral'
}

export default function AnnotationRadio<V extends string>({
  className,
  type,
  color,
  isCrowd,
  children,
  ...props
}: AnnotationRadioProps<V>) {
  const TypeIcon = type === 'polygon' ? CubeTransparentIcon : PaintBrushIcon

  return (
    <Radio
      className={twMerge(annotationRadioStyles.root({ color, className }))}
      {...props}>
      <span className={annotationRadioStyles.slots.root()}>
        <span
          className={annotationRadioStyles.slots.item.root({
            color,
            type: true,
          })}>
          <TypeIcon className={annotationRadioStyles.slots.item.icon()} />
        </span>
        {isCrowd === 'yes' && (
          <span
            className={annotationRadioStyles.slots.item.root({ crowd: true })}>
            <UserGroupIcon
              className={annotationRadioStyles.slots.item.icon()}
            />
          </span>
        )}
      </span>
      <Label className={annotationRadioStyles.label()}>{children}</Label>
    </Radio>
  )
}
