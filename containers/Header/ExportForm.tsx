'use client'

import { useState, useTransition } from 'react'

import validateDataset from '@/actions/validateDataset'
import type {
  Dataset,
  DatasetInfo,
  DatasetLicense,
  ValidateDataset,
} from '@/actions/validateDataset'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useCanvasRefs from '@/hooks/useCanvasRefs'
import useFormSubmit from '@/hooks/useFormSubmit'
import { fields, tabs } from '@/lib/exportForm'
import generateLink from '@/lib/generateLink'
import isValidationSuccessful from '@/lib/isValidationSuccessful'
import FieldText from '@/ui/FieldText'
import {
  Button,
  Fieldset,
  Legend,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  useClose,
} from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

interface ExportFormFields {
  license_name: string
  license_url: string
  info_description: string
  info_url: string
  info_version: string
  info_year: string
  info_contributor: string
  info_date_created: string
}

export default function ExportForm() {
  const dispatch = useAppDispatch()
  const annotatorRef = useCanvasRefs()
  const images = useAppState((state) => state.dataset.images)
  const categories = useAppState((state) => state.dataset.categories)
  const annotations = useAppState((state) => state.dataset.annotations)
  const licenses = useAppState((state) => state.annotator.previous.licenses)
  const info = useAppState((state) => state.annotator.previous.info)
  const closeToolbarExport = useClose()
  const [isPending, startTransition] = useTransition()
  const [validation, setValidation] = useState<ValidateDataset | null>(null)
  const formSubmit = useFormSubmit<ExportFormFields>((fields) => {
    const newLicense: DatasetLicense = {
      name: fields.license_name,
      url: fields.license_url,
      id: images[0].id,
    }
    const newInfo: DatasetInfo = {
      description: fields.info_description,
      url: fields.info_url,
      version: fields.info_version,
      year: +fields.info_year,
      contributor: fields.info_contributor,
      date_created: fields.info_date_created,
    }

    dispatch.annotator.setMode('exporting')
    startTransition(async () => {
      const newDataset: Dataset = {
        images,
        categories,
        annotations,
        licenses: [newLicense],
        info: newInfo,
      }
      const validation = await validateDataset(newDataset)

      startTransition(() => {
        if (!isValidationSuccessful(validation)) {
          return setValidation(validation)
        }

        setValidation(null)
        generateLink({
          name: `${images[0].file_name}_${fields.info_date_created}_annotations.json`,
          value: newDataset,
        })
        dispatch.annotator.addLicense(newLicense)
        dispatch.annotator.setInfo(newInfo)
        dispatch.annotator.setMode('waiting')
        // CLEAR REFS
        annotatorRef.file.current = null
        annotatorRef.image.current = null
        annotatorRef.canvas.current?.clear()
        // CLOSE DIALOG
        closeToolbarExport()
      })
    })
  })

  return (
    <form
      className="bg-neutral-900"
      onSubmit={formSubmit.onSubmit}>
      <Fieldset disabled={isPending}>
        <Legend className="bg-neutral-800 px-4 pb-2 text-white/60">
          Fill in the license and information dataset details to validate it
          before exporting.
        </Legend>
        <TabGroup>
          <TabList className="flex bg-neutral-800">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className="inline-flex h-10 w-full items-center justify-center border-b-2 border-b-transparent px-4 text-xs font-semibold uppercase tracking-wider text-white hover:border-gray-50 data-[selected]:border-gray-50/20 data-[hover]:bg-white/5 hover:data-[selected]:border-gray-50">
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab) => (
              <TabPanel key={tab.name}>
                {fields
                  .filter((field) => field.tab === tab.name)
                  .map((field) => {
                    const name =
                      `${tab.name}_${field.name}` as keyof ExportFormFields
                    let defaultValue: string | number | undefined

                    if (tab.name === 'license' && !!licenses.length) {
                      // TODO: allow choosing the license/dropdown with previous added licenses? so instead of [license] it's [index-of-the-license]
                      const [license] = licenses

                      defaultValue = license[field.name as keyof DatasetLicense]
                    }

                    if (tab.name === 'info' && info != null) {
                      defaultValue = info[field.name as keyof DatasetInfo]
                    }

                    return (
                      <FieldText
                        name={name}
                        key={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        defaultValue={defaultValue}
                        invalid={{
                          when: formSubmit.fields.empty.includes(name),
                          message: `Empty`,
                        }}
                      />
                    )
                  })}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
        <div className="flex items-center">
          <Button
            type="submit"
            className={twMerge(
              'inline-flex h-10 w-full items-center justify-center px-4 text-xs font-semibold uppercase tracking-wider text-white data-[disabled]:cursor-not-allowed data-[hover]:bg-white/5 data-[disabled]:text-white/40',
              isValidationSuccessful(validation) &&
                'pointer-events-none text-green-400',
            )}>
            {isValidationSuccessful(validation) ? (
              <>
                <CheckIcon className="mr-2 size-6" />
                Valid
              </>
            ) : (
              `Valid${isPending ? 'ating...' : 'ate'}`
            )}
          </Button>
        </div>
      </Fieldset>
    </form>
  )
}
