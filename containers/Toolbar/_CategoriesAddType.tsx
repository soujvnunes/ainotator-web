import { PaintBrushIcon, StarIcon } from '@heroicons/react/24/solid'

import annotatorTypes from '@/consts/annotatorTypes'

import textField from '@/styles/textField'

import RadioField from '@/components/RadioField'

export default function CategoriesAddType() {
  return (
    <>
      <p
        aria-hidden="true"
        className={textField.label.root({
          className: 'cursor-default',
        })}>
        Type
      </p>
      <RadioField
        aria-label="Type"
        className="mt-2 flex"
        name="type"
        defaultValue={categoriesAddType[0].value}
        values={categoriesAddType}
      />
    </>
  )
}

const categoriesAddType = annotatorTypes.map((value) => {
  const Icon = value === 'polygon' ? StarIcon : PaintBrushIcon

  return { children: <Icon className="size-4" />, value }
})
