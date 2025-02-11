import { type DatasetValidation } from '@/actions/validateDataset'

interface ValidDataset {
  message: 'Success'
}

export default function isDatasetValid(
  params: DatasetValidation,
): params is ValidDataset {
  return params.message === 'Success'
}
