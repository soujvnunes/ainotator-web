import { type DatasetValidation } from '@/actions'

interface ValidDataset {
  message: 'Success'
}

export default function isDatasetValid(
  params: DatasetValidation,
): params is ValidDataset {
  return params.message === 'Success'
}
