'use client'

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
  CubeTransparentIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/solid'

export default function AnnotatorToolbarAddForm() {
  return (
    <form>
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
            name="class-name"
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
            name="class-supercategory"
            placeholder="Animal"
            className="mt-2 block w-full border-x-none border-t-none border-b-transparent border-b-2 bg-white/5 h-10 px-4 text-sm  focus:outline-none data-[focus]:border-b-2  data-[focus]:border-gray-50/20"
          />
        </Field>
        <Field className="mt-4">
          <Label className="px-4 text-sm font-medium cursor-pointer">
            Color
          </Label>
          <RadioGroup className="flex mt-2">
            {Object.entries(colors).map(([color, code]) => (
              <Radio
                className="inline-flex w-full cursor-pointer group aspect-square"
                key={color}
                value={color}
                aria-label={color}
                style={{ backgroundColor: code }}>
                <CheckIcon className="m-auto size-6 opacity-0 text-white group-data-[hover]:opacity-100 group-data-[checked]:opacity-100" />
              </Radio>
            ))}
          </RadioGroup>
        </Field>
        <div className="flex items-center">
          <Button
            aria-label="Brush"
            className="inline-flex items-center data-[disabled]:text-white/40 data-[disabled]:cursor-not-allowed justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 ">
            <PaintBrushIcon className="size-4" />
          </Button>
          <Button
            aria-label="Polygon"
            className="inline-flex items-center data-[disabled]:text-white/40 data-[disabled]:cursor-not-allowed justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 ">
            <CubeTransparentIcon className="size-4" />
          </Button>
        </div>
      </Fieldset>
    </form>
  )
}

const colors = {
  red: '#f33',
  orange: '#f93',
  yellow: '#fc0',
  lime: '#9c3',
  green: '#096',
  teal: '#099',
  cyan: '#09f',
  blue: '#06c',
  sky: '#339',
  olive: '#939',
  pink: '#f09',
  coral: '#f06',
}
