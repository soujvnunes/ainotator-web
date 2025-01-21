import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from '@headlessui/react'

export default function AnnotatorToolbarExportLicenseForm() {
  return (
    <Fieldset className="p-4 space-y-4">
      <Legend className="text-white/60">Add license</Legend>
      <Field>
        <Label className="text-sm font-medium text-white">URL</Label>
        <Input
          placeholder="http://creativecommons.org/licenses/by-nc-sa/2.0/"
          className="mt-3 block w-full border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        />
      </Field>
      <Field>
        <Label className="text-sm font-medium text-white">Name</Label>
        <Input
          placeholder="Attribution-NonCommercial-ShareAlike License"
          className="mt-3 block w-full border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        />
      </Field>
    </Fieldset>
  )
}
