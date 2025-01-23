'use client'

import validateDataset, {
  type ValidateDataset,
} from '@/actions/validateDataset'
import isValidationSuccessful from '@/helpers/isValidationSuccessful'
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
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  useClose,
} from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useCallback, useState, useTransition } from 'react'
import { twMerge } from 'tailwind-merge'
import { fieldsInitialState, tabs } from './annotatorToolbarExportForm.utils'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'

export default function AnnotatorToolbarExportForm() {
  const dispatch = useAnnotatorDispatch()
  const annotatorRef = useAnnotatorRefs()
  const images = useAnnotatorState((state) => state.dataset.images)
  const categories = useAnnotatorState((state) => state.dataset.categories)
  const annotations = useAnnotatorState((state) => state.dataset.annotations)
  const closeAnnotatorToolbarExport = useClose()
  const [isPending, startTransition] = useTransition()
  const [tabId, setTabId] = useState(0)
  const [validation, setValidation] = useState<ValidateDataset | null>(null)
  // TODO: add the possibility of filling this with previous info and licenses from state.annotator.
  const [fields, setFields] = useState(() => fieldsInitialState)
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

      dispatch.annotator.setMode({ name: 'exporting' })
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

          // CREATE THE LINK AND DOWNLOAD THE FILE
          // TODO: get the file by a route probably
          const blob = new Blob([JSON.stringify(newDataset, null, 2)], {
            type: 'application/json',
          })
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `${images[0].file_name}_${fields.info.date_created}_annotations.json`
          link.click()
          URL.revokeObjectURL(url)
          // DISPATCH VALID DETAILS AND RESET ANNOTATING STATE
          dispatch.annotator.addLicense(newLicense)
          dispatch.annotator.setInfo(newInfo)
          dispatch.annotator.setMode({ name: 'waiting' })
          // CLEAR REFS
          annotatorRef.file.current = null
          annotatorRef.image.current = null
          annotatorRef.canvas.current?.clear()
          // CLOSE MODAL
          closeAnnotatorToolbarExport()
        })
      })
    },
    [images, dispatch, categories, annotations],
  )

  return (
    <form>
      <Fieldset disabled={isPending}>
        <Legend className="px-4 pb-2 bg-neutral-800 text-white/60">
          Fill in the license and information dataset details to validate it
          before exporting.
        </Legend>
        <TabGroup
          selectedIndex={tabId}
          onChange={setTabId}>
          <TabList className="flex bg-neutral-800">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className="inline-flex items-center  justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 border-b-2 border-b-transparent hover:border-gray-50 hover:data-[selected]:border-gray-50 data-[selected]:border-gray-50/20 ">
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab) => (
              <TabPanel key={tab.name}>
                {tab.fields.map((field) => (
                  <Field
                    className="mt-4"
                    key={field.name}>
                    <Label className="px-4 text-sm font-medium cursor-pointer">
                      {field.label}
                    </Label>
                    <Input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      className="mt-2 block w-full border-x-none border-t-none border-b-transparent border-b-2 bg-white/5 h-10 px-4 text-sm  focus:outline-none data-[focus]:border-b-2  data-[focus]:border-gray-50/20"
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
              'inline-flex items-center data-[disabled]:text-white/40 data-[disabled]:cursor-not-allowed justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/5 ',
              isValidationSuccessful(validation) &&
                'text-green-400 pointer-events-none',
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
