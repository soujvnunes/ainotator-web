'use client'

import useAppDispatch from '@/hooks/useAppDispatch'
import useFormSubmit from '@/hooks/useFormSubmit'
import {
  annotatorCategoryCrowds,
  annotatorCategoryType,
  type AnnotatorCategoryCrowds,
  type AnnotatorCategoryType,
} from '@/lib/annotatorSlice'
import FieldText from '@/ui/FieldText'
import { Button, Fieldset, Legend, Radio, RadioGroup } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/24/outline'
import {
  CheckIcon,
  PaintBrushIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

interface AddFormFields {
  name: string
  supercategory: string
  is_crowded: AnnotatorCategoryCrowds
  type: AnnotatorCategoryType
  color: string
}

export default function AddForm() {
  const dispatch = useAppDispatch()
  const formSubmit = useFormSubmit<AddFormFields>((fields) => {
    dispatch.annotator.addCategory({
      id: Date.now(),
      name: fields.name,
      color: fields.color,
      supercategory: fields.supercategory,
      type: fields.type,
      isCrowd: fields.is_crowded,
    })
  })

  return (
    <form
      className="bg-neutral-900"
      onSubmit={formSubmit.onSubmit}>
      <Fieldset>
        <Legend className="px-4 pb-2 bg-neutral-800 text-white/60">
          Define class names and assign a unique color to each one.
        </Legend>
        <FieldText
          name="name"
          label="Name"
          placeholder="Cat"
          autoComplete="annotation class name"
          invalid={{
            when: formSubmit.fields.empty.includes('name'),
            message: 'Empty',
          }}
        />
        <FieldText
          name="supercategory"
          label="Supercategory"
          placeholder="Animal"
          autoComplete="annotation super category name"
          invalid={{
            when: formSubmit.fields.empty.includes('supercategory'),
            message: 'Empty',
          }}
        />
        <p className="px-4 mt-4 text-sm font-medium cursor-pointer">Crowd</p>
        <RadioGroup
          aria-label="Is crowded?"
          className="flex mt-2"
          name="is_crowded"
          defaultValue={annotatorCategoryCrowds[0]}>
          {annotatorCategoryCrowds.map((crowd) => (
            <Radio
              className="inline-flex h-10 w-full cursor-pointer items-center justify-center px-4 text-xs font-semibold uppercase tracking-wider text-white data-[checked]:bg-white data-[checked]:data-[hover]:bg-white/60 data-[hover]:bg-white/5 data-[checked]:text-black"
              key={crowd}
              value={crowd}
              aria-label={crowd}>
              {crowd === 'yes' ? (
                <UserGroupIcon className="size-4" />
              ) : (
                <UserIcon className="size-4" />
              )}
            </Radio>
          ))}
        </RadioGroup>
        <p className="px-4 mt-4 text-sm font-medium cursor-pointer">Type</p>
        <RadioGroup
          aria-label="Type"
          className="flex mt-2"
          name="type"
          defaultValue={annotatorCategoryType[0]}>
          {annotatorCategoryType.map((type) => (
            <Radio
              className="inline-flex h-10 w-full cursor-pointer items-center justify-center px-4 text-xs font-semibold uppercase tracking-wider text-white data-[checked]:bg-white data-[checked]:data-[hover]:bg-white/60 data-[hover]:bg-white/5 data-[checked]:text-black"
              key={type}
              value={type}
              aria-label={type}>
              {type === 'polygon' ? (
                <StarIcon className="size-4" />
              ) : (
                <PaintBrushIcon className="size-4" />
              )}
            </Radio>
          ))}
        </RadioGroup>
        <RadioGroup
          className="flex"
          name="color"
          defaultValue={colors.red}>
          {Object.entries(colors).map(([color, code]) => (
            <Radio
              className="inline-flex w-full cursor-pointer group aspect-square"
              key={color}
              value={code}
              aria-label={color}
              style={{ backgroundColor: `rgb(${code})` }}>
              <CheckIcon className="m-auto size-6 text-white opacity-0 group-data-[checked]:opacity-100 group-data-[hover]:opacity-100" />
            </Radio>
          ))}
        </RadioGroup>
        <Button
          type="submit"
          className="inline-flex h-10 w-full items-center justify-center px-4 text-xs font-semibold uppercase tracking-wider text-white data-[disabled]:cursor-not-allowed data-[hover]:bg-white/5 data-[disabled]:text-white/40">
          Add
        </Button>
      </Fieldset>
    </form>
  )
}

// TODO: implement just the name based of button categories
const colors = {
  red: '255 51 51', // #f33
  orange: '255 153 51', // #f93
  yellow: '255 204 0', // #fc0
  lime: '153 204 51', // #9c3
  green: '0 153 102', // #096
  teal: '0 153 153', // #099
  cyan: '0 153 255', // #09f
  blue: '0 102 204', // #06c
  sky: '51 51 153', // #339
  olive: '153 51 153', // #939
  pink: '255 0 153', // #f09
  coral: '255 0 102', // #f06
}
