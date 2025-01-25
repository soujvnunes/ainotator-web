'use client'

import { useCallback, useState, useTransition } from 'react'

import validateDataset, {
  type ValidateDataset,
} from '@/actions/validateDataset'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useCanvasRefs from '@/hooks/useCanvasRefs'
import isValidationSuccessful from '@/lib/isValidationSuccessful'
import { toolbarExportFormFields } from '@/lib/toolbarExportFormFields'
import { toolbarExportFormState } from '@/lib/toolbarExportFormState'
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
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

export default function ExportForm() {
  const dispatch = useAppDispatch()
  const annotatorRef = useCanvasRefs()
  const images = useAppState((state) => state.dataset.images)
  const categories = useAppState((state) => state.dataset.categories)
  const annotations = useAppState((state) => state.dataset.annotations)
  const closeToolbarExport = useClose()
  const [isPending, startTransition] = useTransition()
  const [tabId, setTabId] = useState(0)
  const [validation, setValidation] = useState<ValidateDataset | null>(null)
  // TODO: add the possibility of filling this with previous info and licenses from state.annotator.
  const [fields, setFields] = useState(() => toolbarExportFormState)
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentTab = !tabId ? 'license' : 'info'

      setFields((prevState) => ({
        ...prevState,
        [currentTab]: {
          ...prevState[currentTab],
          [event.target.name]: event.target.value,
        },
      }))
    },
    [tabId],
  )
  const handleValidate = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      const newLicense = { ...fields.license, id: images[0].id }
      const newInfo = fields.info

      dispatch.annotator.setMode('exporting')
      startTransition(async () => {
        const newDataset = {
          images,
          categories,
          annotations,
          licenses: [newLicense],
          info: newInfo,
        }
        const validation = await validateDataset(newDataset)

        await new Promise((resolve) => setTimeout(resolve, 3000))

        startTransition(() => {
          setValidation(validation)

          if (!isValidationSuccessful(validation)) return

          // CLEAN LOCAL STATES
          setValidation(null)
          // CREATE THE LINK AND DOWNLOAD THE FILE
          // TODO: get the file by a route probably
          const blob = new Blob([JSON.stringify(newDataset, null, 2)], {
            type: 'application/json',
          })
          const url = URL.createObjectURL(blob)
          const link = window.document.createElement('a')

          link.href = url
          link.download = `${images[0].file_name}_${fields.info.date_created}_annotations.json`
          window.document.body.appendChild(link)
          link.click()
          window.document.body.removeChild(link)
          URL.revokeObjectURL(url)
          // DISPATCH VALID DETAILS AND RESET ANNOTATING STATE
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
    },
    [
      fields.license,
      fields.info,
      images,
      dispatch.annotator,
      categories,
      annotations,
      annotatorRef.file,
      annotatorRef.image,
      annotatorRef.canvas,
      closeToolbarExport,
    ],
  )

  return (
    <form className="bg-neutral-900">
      <Fieldset disabled={isPending}>
        <Legend className="bg-neutral-800 px-4 pb-2 text-white/60">
          Fill in the license and information dataset details to validate it
          before exporting.
        </Legend>
        <TabGroup
          selectedIndex={tabId}
          onChange={setTabId}>
          <TabList className="flex bg-neutral-800">
            {toolbarExportFormFields.map((tab) => (
              <Tab
                key={tab.name}
                className="inline-flex h-10 w-full items-center justify-center border-b-2 border-b-transparent px-4 text-xs font-semibold uppercase tracking-wider text-white hover:border-gray-50 data-[selected]:border-gray-50/20 data-[hover]:bg-white/5 hover:data-[selected]:border-gray-50">
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {toolbarExportFormFields.map((tab) => (
              <TabPanel key={tab.name}>
                {tab.fields.map((field) => (
                  <Field
                    className="mt-4"
                    key={field.name}>
                    <Label className="cursor-pointer px-4 text-sm font-medium">
                      {field.label}
                    </Label>
                    <Input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      className="border-x-none border-t-none mt-2 block h-10 w-full border-b-2 border-b-transparent bg-white/5 px-4 text-sm focus:outline-none data-[focus]:border-b-2 data-[focus]:border-gray-50/20"
                      onChange={handleChange}
                    />
                  </Field>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
        <div className="flex items-center">
          <Button
            type="submit"
            onClick={handleValidate}
            className={twMerge(
              'inline-flex h-10 w-full items-center justify-center px-4 text-xs font-semibold uppercase tracking-wider text-white data-[disabled]:cursor-not-allowed data-[hover]:bg-white/5 data-[disabled]:text-white/40',
              isValidationSuccessful(validation) &&
                'pointer-events-none text-green-400',
            )}
            disabled={Object.values(
              Object.assign({}, ...Object.values(fields)),
            ).some((value) => !value)}>
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
