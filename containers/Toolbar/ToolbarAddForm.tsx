'use client'

import { useCallback } from 'react'
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Radio,
  RadioGroup,
} from '@headlessui/react'
import {
  CheckIcon,
  PaintBrushIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/outline'
import {
  annotatorCategoryCrowds,
  annotatorCategoryType,
  type AnnotatorCategoryCrowds,
  type AnnotatorCategoryType,
} from '@/lib/annotatorSlice'
import useAppDispatch from '@/hooks/useAppDispatch'

export default function ToolbarAddForm() {
  const dispatch = useAppDispatch()
  const handleAdd = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const formEntries = Object.fromEntries(formData.entries())

    if (Object.values(formEntries).some((field) => !field)) return

    const id = Date.now()

    dispatch.annotator.addCategory({
      id,
      name: formEntries.name as string,
      color: formEntries.color as string,
      supercategory: formEntries.supercategory as string,
      type: formEntries.type as AnnotatorCategoryType,
      isCrowd: formEntries.is_crowded as AnnotatorCategoryCrowds,
    })
  }, [])

  return (
    <form
      className="bg-neutral-900"
      onSubmit={handleAdd}>
      <Fieldset>
        <Legend className="px-4 pb-2 bg-neutral-800 text-white/60">
          Define class names and assign a unique color to each one.
        </Legend>
        <Field className="mt-4">
          <Label className="px-4 text-sm font-medium cursor-pointer">
            Name
          </Label>
          <Input
            autoComplete="annotation class name"
            type="text"
            name="name"
            placeholder="Cat"
            className="mt-2 block w-full border-x-none border-t-none border-b-transparent border-b-2 bg-white/5 h-10 px-4 text-sm  focus:outline-none data-[focus]:border-b-2  data-[focus]:border-gray-50/20"
          />
        </Field>
        <Field className="mt-4">
          <Label className="px-4 text-sm font-medium cursor-pointer">
            Supercategory
          </Label>
          <Input
            autoComplete="annotation super category name"
            type="text"
            name="supercategory"
            placeholder="Animal"
            className="mt-2 block w-full border-x-none border-t-none border-b-transparent border-b-2 bg-white/5 h-10 px-4 text-sm  focus:outline-none data-[focus]:border-b-2  data-[focus]:border-gray-50/20"
          />
        </Field>
        <p className="px-4 mt-4 text-sm font-medium cursor-pointer">Crowd</p>
        <RadioGroup
          aria-label="Is crowded?"
          className="flex mt-2"
          name="is_crowded"
          defaultValue={annotatorCategoryCrowds[0]}>
          {annotatorCategoryCrowds.map((crowd) => (
            <Radio
              className="inline-flex cursor-pointer items-center justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 data-[checked]:bg-white data-[checked]:data-[hover]:bg-white/60 data-[checked]:text-black"
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
              className="inline-flex cursor-pointer items-center justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 data-[checked]:bg-white data-[checked]:data-[hover]:bg-white/60 data-[checked]:text-black"
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
              <CheckIcon className="m-auto size-6 opacity-0 text-white group-data-[hover]:opacity-100 group-data-[checked]:opacity-100" />
            </Radio>
          ))}
        </RadioGroup>
        <Button
          type="submit"
          className="inline-flex items-center data-[disabled]:text-white/40 data-[disabled]:cursor-not-allowed justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 ">
          Add
        </Button>
      </Fieldset>
    </form>
  )
}

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
