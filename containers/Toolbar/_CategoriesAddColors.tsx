import { RadioGroup } from '@headlessui/react'

import annotatorColors from '@/consts/annotatorColors'

import AnnotationRadio from '@/components/AnnotationRadio'

export default function CategoriesAddColors() {
  return (
    <RadioGroup
      className="flex"
      name="color"
      defaultValue={annotatorColors.value[0]}>
      {annotatorColors.value.map((color) => (
        <AnnotationRadio
          compact
          key={color}
          value={color}
          color={color}
          aria-label={color}
        />
      ))}
    </RadioGroup>
  )
}
