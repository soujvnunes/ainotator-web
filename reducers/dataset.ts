import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

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

export interface DatasetState {
  info: DatasetInfo
  licenses: DatasetLicense[]
  images: DatasetImage[]
  annotations: DatasetAnnotation[]
  categories: DatasetCategory[]
}

const initialState: DatasetState = {
  info: {
    description: '',
    url: '',
    version: '',
    year: 0,
    contributor: '',
    date_created: '',
  },
  licenses: [],
  images: [],
  annotations: [],
  categories: [],
}

export default createSlice({
  name: 'dataset',
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<DatasetInfo>) => ({
      ...state,
      info: action.payload,
    }),
    addLicense: (state, action: PayloadAction<DatasetLicense>) => ({
      ...state,
      licenses: [...state.licenses, action.payload],
    }),
    addImage: (state, action: PayloadAction<DatasetImage>) => ({
      ...state,
      images: [...state.images, action.payload],
    }),
    setImage: (
      state,
      action: PayloadAction<
        Pick<DatasetImage, 'id'> & Partial<Omit<DatasetImage, 'id'>>
      >,
    ) => ({
      ...state,
      images: state.images.map((image) => {
        if (image.id !== action.payload.id) return image

        return { ...image, ...action.payload }
      }),
    }),
    addAnnotation: (state, action: PayloadAction<DatasetAnnotation>) => ({
      ...state,
      annotations: [...state.annotations, action.payload],
    }),
    addCategory: (state, action: PayloadAction<DatasetCategory>) => ({
      ...state,
      categories: [...state.categories, action.payload],
    }),
  },
})
