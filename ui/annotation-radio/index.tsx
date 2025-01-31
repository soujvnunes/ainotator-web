import { Radio } from '@headlessui/react'
import {
  CheckIcon,
  CubeTransparentIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

import type { AnnotatorColors, AnnotatorCrowds, AnnotatorTypes } from '@/lib'

import annotationRadioStyles from './styles'

export interface AnnotationRadioProps<V extends string | number>
  extends React.ComponentPropsWithRef<'input'> {
  value: V
  color: AnnotatorColors
  compact?: boolean
  isCrowd?: AnnotatorCrowds
  type?: AnnotatorTypes
}

export default function AnnotationRadio<V extends string | number>({
  className,
  type,
  color,
  isCrowd,
  children,
  compact,
  ...props
}: AnnotationRadioProps<V>) {
  const TypeIcon = type === 'polygon' ? CubeTransparentIcon : PaintBrushIcon

  return (
    <Radio
      className={twMerge(
        annotationRadioStyles.root({ color, compact, className }),
      )}
      {...props}>
      {compact ? (
        <CheckIcon
          className={annotationRadioStyles.slots.root({ compact: true })}
        />
      ) : (
        <>
          <span
            className={annotationRadioStyles.slots.root({ compact: false })}>
            <span
              className={annotationRadioStyles.slots.item.root({
                color,
                type: true,
              })}>
              <TypeIcon className={annotationRadioStyles.slots.item.icon()} />
            </span>
            {isCrowd === 'yes' && (
              <span
                className={annotationRadioStyles.slots.item.root({
                  crowd: true,
                })}>
                <UserGroupIcon
                  className={annotationRadioStyles.slots.item.icon()}
                />
              </span>
            )}
          </span>
          <span className={annotationRadioStyles.label}>{children}</span>
        </>
      )}
    </Radio>
  )
}
