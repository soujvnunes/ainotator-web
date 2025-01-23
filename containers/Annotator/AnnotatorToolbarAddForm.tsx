'use client'

import { useCallback } from 'react'
import { useAnnotatorDispatch } from '@/providers/AnnotatorProvider'
import type { Category } from '@/stores/annotator'
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Radio,
  RadioGroup,
  useClose,
} from '@headlessui/react'
import {
  CheckIcon,
  CubeTransparentIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/solid'

export default function AnnotatorToolbarAddForm() {
  const dispatch = useAnnotatorDispatch()
  const closeAnnotatorToolbarAddForm = useClose()
  const handleAdd = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const form = event.currentTarget.form
      const name = event.currentTarget.name as Category

      if (form) {
        const formData = new FormData(form)
        const formEntries = Object.fromEntries(formData.entries())

        console.log(formEntries)

        // TODO: add error UI
        if (Object.values(formEntries).some((field) => !field)) return

        const id = Date.now()

        dispatch.annotator.addCategory({
          supercategory: formEntries.supercategory as string,
          id,
          name: formEntries.name as string,
          type: name,
          color: formEntries.color as string,
        })
        closeAnnotatorToolbarAddForm()
      }
    },
    [],
  )

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Fieldset>
        <Legend className="px-4 pb-2 bg-neutral-800 text-white/60">
          Define class names and assign a unique color to each one.
        </Legend>
        <Field className="mt-4">
          <Label className="px-4 text-sm font-medium cursor-pointer">
            Name
          </Label>
          <Input
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
            type="text"
            name="supercategory"
            placeholder="Animal"
            className="mt-2 block w-full border-x-none border-t-none border-b-transparent border-b-2 bg-white/5 h-10 px-4 text-sm  focus:outline-none data-[focus]:border-b-2  data-[focus]:border-gray-50/20"
          />
        </Field>
        <Field className="mt-4">
          <Label className="px-4 text-sm font-medium cursor-pointer">
            Color
          </Label>
          <RadioGroup
            className="flex mt-2"
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
        </Field>
        <div className="flex items-center">
          {types.map((type) => (
            <Button
              className="inline-flex items-center data-[disabled]:text-white/40 data-[disabled]:cursor-not-allowed justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 "
              key={type}
              name={type}
              aria-label={type}
              onClick={handleAdd}>
              {type === 'polygon' ? (
                <CubeTransparentIcon className="size-4" />
              ) : (
                <PaintBrushIcon className="size-4" />
              )}
            </Button>
          ))}
        </div>
      </Fieldset>
    </form>
  )
}

const types = ['brush', 'polygon']
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
