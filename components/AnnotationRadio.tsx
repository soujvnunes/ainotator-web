import { Radio } from '@headlessui/react'
import {
  CheckIcon,
  CubeTransparentIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'

import { type AnnotatorCrowds } from '@/consts/annotatorCrowds'
import { type AnnotatorTypes } from '@/consts/annotatorTypes'

import twMerge from '@/helpers/twMerge'

import annotationRadio from '@/styles/annotationRadio'

export interface AnnotationRadioProps<V extends string | number>
  extends Omit<React.ComponentPropsWithRef<'input'>, 'color' | 'type'> {
  value: V
  color: `${number} ${number} ${number}`
  compact?: boolean
  isCrowd?: AnnotatorCrowds
  type?: AnnotatorTypes
}

export default function AnnotationRadio<V extends string | number>({
  className,
  color,
  type = 'brush',
  isCrowd = 'no',
  children,
  compact = false,
  ...props
}: AnnotationRadioProps<V>) {
  const TypeIcon = type === 'polygon' ? CubeTransparentIcon : PaintBrushIcon

  return (
    <Radio
      style={{ ['--color' as string]: `rgb(${color})` }}
      className={twMerge(annotationRadio.root({ compact, className }))}
      {...props}>
      {compact ? (
        <CheckIcon className={annotationRadio.slots.root({ compact: true })} />
      ) : (
        <>
          <span className={annotationRadio.slots.root({ compact: false })}>
            <span className={annotationRadio.slots.item.root({ type: true })}>
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
