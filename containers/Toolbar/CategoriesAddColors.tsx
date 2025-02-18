import { RadioGroup } from '@headlessui/react'

import annotatorColors from '@/consts/annotatorColors'

import AnnotationRadio from '@/components/AnnotationRadio'

export default function CategoriesAddColors() {
  return (
    <RadioGroup
      className="flex"
      name="color"
      defaultValue={annotatorColors.red}>
      {Object.entries(annotatorColors).map(([color, value]) => (
        <AnnotationRadio
          compact
          key={color}
          value={value}
          color={value}
          aria-label={color}
        />
      ))}
    </RadioGroup>
  )
}
