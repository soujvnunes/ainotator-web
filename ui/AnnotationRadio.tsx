import { Radio } from '@headlessui/react'
import {
  CheckIcon,
  CubeTransparentIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'

import type { AnnotatorColors, AnnotatorCrowds, AnnotatorTypes } from '@/lib'

import { twMerge } from '@/helpers'

import annotationRadio from '@/styles/annotationRadio'

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
      className={twMerge(annotationRadio.root({ color, compact, className }))}
      {...props}>
      {compact ? (
        <CheckIcon className={annotationRadio.slots.root({ compact: true })} />
      ) : (
        <>
          <span className={annotationRadio.slots.root({ compact: false })}>
            <span
              className={annotationRadio.slots.item.root({
                color,
                type: true,
              })}>
              <TypeIcon className={annotationRadio.slots.item.icon()} />
            </span>
            {isCrowd === 'yes' && (
              <span
                className={annotationRadio.slots.item.root({
                  crowd: true,
                })}>
                <UserGroupIcon className={annotationRadio.slots.item.icon()} />
              </span>
            )}
          </span>
          <span className={annotationRadio.label}>{children}</span>
        </>
      )}
    </Radio>
  )
}
