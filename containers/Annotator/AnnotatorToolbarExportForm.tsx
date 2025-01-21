'use client'

import validateDataset, {
  type ValidateDataset,
} from '@/actions/validateDataset'
import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from '@headlessui/react'
import Link from 'next/link'
import { useCallback, useState, useTransition } from 'react'

export default function AnnotatorToolbarExportForm() {
  const dispatch = useAnnotatorDispatch()
  const [isPending, startTransition] = useTransition()
  const images = useAnnotatorState((state) => state.dataset.images)
  const dataset = useAnnotatorState((state) => state.dataset)
  // TODO: on first validation, add/validate info and then generate link
  const [validation, setValidation] = useState<ValidateDataset | null>(null)
  const [license, setLicense] = useState({ url: '', name: '' })
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLicense((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }))
    },
    [],
  )
  const handleValidate = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      const newLicense = { ...license, id: images[0].id }

      startTransition(async () => {
        const validation = await validateDataset({
          ...dataset,
          licenses: [newLicense],
        })
        await new Promise((resolve) => setTimeout(resolve, 3000))

        startTransition(() => {
          setValidation(validation)

          if (validation.message === 'Success') dispatch.addLicense(newLicense)
        })
      })
    },
    [images, dispatch],
  )

  return (
    <form>
      <Fieldset disabled={isPending}>
        <Legend className="px-4 mb-4 text-white/60">
          Fill in the following license information to validate the dataset
          before exporting it.
        </Legend>
        <Field className="mb-4">
          <Label className="px-4 text-sm font-medium cursor-pointer">URL</Label>
          <Input
            type="text"
            name="url"
            placeholder="http://creativecommons.org/licenses/by-nc-sa/2.0/"
            className="mt-2 block w-full border-none bg-white/5 h-10 px-4 text-sm  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label className="px-4 text-sm font-medium cursor-pointer">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            placeholder="Attribution-NonCommercial-ShareAlike License"
            className="mt-2 block w-full border-none bg-white/5 h-10 px-4 text-sm  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            onChange={handleChange}
          />
        </Field>
        <div className="flex items-center">
          <Button
            type="submit"
            className="inline-flex items-center data-[disabled]:text-white/40 data-[disabled]:cursor-not-allowed justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 "
            onClick={handleValidate}
            disabled={Object.values(license).some((value) => !value)}>
            Valid{isPending ? 'ating...' : 'ate'}
          </Button>
          <Link
            className="inline-flex data-[disabled]:text-white/40 data-[disabled]:bg-white/5 data-[disabled]:cursor-not-allowed items-center justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	   data-[hover]:bg-white/5 "
            href=""
            data-disabled>
            Export
          </Link>
        </div>
      </Fieldset>
    </form>
  )
}
