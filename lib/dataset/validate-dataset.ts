'use server'

import { type DatasetState } from './index'

export interface DatasetValidation {
  message: string
  details?: { loc: string[]; msg: string; type: string }[]
}

export default async function validateDataset(
  dataset: DatasetState,
): Promise<DatasetValidation> {
  const { API_BASE_URL } = process.env

  if (!API_BASE_URL) {
    return { message: 'Missing API_BASE_URL `.env` variable' }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/validate_coco`, {
      method: 'POST',
      body: JSON.stringify(dataset),
      headers: { 'Content-Type': 'application/json' },
    })

    return response.json()
  } catch (error) {
    return { message: JSON.stringify(error) }
  }
}
