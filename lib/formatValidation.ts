import { ValidateDataset } from '@/actions/validateDataset'

interface FormarttedValidation {
  entry: string
  message: string
}

export default function formatValidation(validation: ValidateDataset) {
  if (validation.details)
    return validation.details.reduce((acc, cur) => {
      const lenght = cur.loc.length
      const [firstLetter, ...message] = cur.msg

      return [
        ...acc,
        {
          entry: cur.loc[lenght - 1].toUpperCase(),
          message: `${firstLetter.toUpperCase()}${message.join('')}.`,
        },
      ]
    }, [] as FormarttedValidation[])

  return [{ entry: '', message: `${validation.message}.` }]
}
