'use server'

export interface DatasetInfo {
  description: string
  url: string
  version: string
  year: number
  contributor: string
  date_created: string
}

export interface DatasetLicense {
  id: number
  url: string
  name: string
}

export interface DatasetImage {
  license: number
  file_name: string
  height: number
  width: number
  date_captured: string
  coco_url: string
  flickr_url: string
  id: number
}

export interface DatasetCategory {
  supercategory: string
  id: number
  name: string
}

export interface DatasetAnnotation {
  segmentation: number[][]
  area: number
  iscrowd: number
  image_id: number
  bbox: number[]
  category_id: number
  id: number
}

export interface Dataset {
  info: DatasetInfo
  licenses: DatasetLicense[]
  images: DatasetImage[]
  annotations: DatasetAnnotation[]
  categories: DatasetCategory[]
}

export interface ValidateDataset {
  message: string
  details?: { loc: string[]; msg: string; type: string }[]
}

export default async function validateDataset(
  dataset: Dataset,
): Promise<ValidateDataset> {
  const { API_BASE_URL } = process.env

  if (!API_BASE_URL) {
    return {
      message: 'Missing API_BASE_URL environment variable',
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/validate_coco`, {
      method: 'POST',
      body: JSON.stringify(dataset),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.json()
  } catch (error) {
    return {
      message: JSON.stringify(error),
    }
  }
}
