'use client'

import { useCallback } from 'react'

import useAppDispatch from '@/hooks/useAppDispatch'
import {
  annotatorCategoryCrowds,
  annotatorCategoryType,
  type AnnotatorCategoryCrowds,
  type AnnotatorCategoryType,
} from '@/lib/annotatorSlice'
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
import { StarIcon } from '@heroicons/react/24/outline'
import {
  CheckIcon,
  PaintBrushIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

export default function AddForm() {
  const dispatch = useAppDispatch()
  const handleAdd = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
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
    },
    [dispatch.annotator],
  )

  return (
    <form
      className="bg-neutral-900"
      onSubmit={handleAdd}>
      <Fieldset>
        <Legend className="bg-neutral-800 px-4 pb-2 text-white/60">
          Define class names and assign a unique color to each one.
        </Legend>
        <Field className="mt-4">
          <Label className="cursor-pointer px-4 text-sm font-medium">
            Name
          </Label>
          <Input
            autoComplete="annotation class name"
            type="text"
            name="name"
            placeholder="Cat"
            className="border-x-none border-t-none mt-2 block h-10 w-full border-b-2 border-b-transparent bg-white/5 px-4 text-sm focus:outline-none data-[focus]:border-b-2 data-[focus]:border-gray-50/20"
          />
        </Field>
        <Field className="mt-4">
          <Label className="cursor-pointer px-4 text-sm font-medium">
            Supercategory
          </Label>
          <Input
            autoComplete="annotation super category name"
            type="text"
            name="supercategory"
            placeholder="Animal"
            className="border-x-none border-t-none mt-2 block h-10 w-full border-b-2 border-b-transparent bg-white/5 px-4 text-sm focus:outline-none data-[focus]:border-b-2 data-[focus]:border-gray-50/20"
          />
        </Field>
        <p className="mt-4 cursor-pointer px-4 text-sm font-medium">Crowd</p>
        <RadioGroup
          aria-label="Is crowded?"
          className="mt-2 flex"
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
        <p className="mt-4 cursor-pointer px-4 text-sm font-medium">Type</p>
        <RadioGroup
          aria-label="Type"
          className="mt-2 flex"
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
              className="group inline-flex aspect-square w-full cursor-pointer"
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
