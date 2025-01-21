import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface DatasetInfo {
  description: string
  url: string
  version: string
  year: string
  contributor: string
  date_created: string
}

interface DatasetLicense {
  id: number
  url: string
  name: string
}

interface DatasetImage {
  license: number
  file_name: string
  height: number
  width: number
  date_captured: string
  coco_url: string
  flickr_url: string
  id: number
}

interface DatasetAnnotation {
  segmentation: number[][]
  area: number
  iscrowd: number
  image_id: number
  bbox: number[]
  category_id: number
  id: number
}

interface DatasetState {
  info: DatasetInfo
  licenses: DatasetLicense[]
  images: DatasetImage[]
  annotations: DatasetAnnotation[]
}

const initialState: DatasetState = {
  info: {
    description: '',
    url: '',
    version: '',
    year: '',
    contributor: '',
    date_created: '',
  },
  licenses: [],
  images: [],
  annotations: [],
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
    addAnnotation: (state, action: PayloadAction<DatasetAnnotation>) => ({
      ...state,
      annotations: [...state.annotations, action.payload],
    }),
  },
})
