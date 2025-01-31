import { DatasetValidation } from '@/actions'

interface FormarttedValidation {
  field: string
  message: string
}

export default function formatDatasetValidation(validation: DatasetValidation) {
  if (validation.details) {
    return validation.details.reduce((acc, { loc, ...cur }) => {
      const [firstLetter, ...msg] = cur.msg
      const field = loc[loc.length - 1].toUpperCase()
      const message = firstLetter.toUpperCase() + msg.join('')

      return [...acc, { field, message }]
    }, [] as FormarttedValidation[])
  }

  return [{ field: '', message: `${validation.message}.` }]
}
