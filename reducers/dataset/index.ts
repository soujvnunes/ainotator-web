import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type {
  Dataset,
  DatasetAnnotation,
  DatasetCategory,
  DatasetImage,
  DatasetInfo,
  DatasetLicense,
} from '@/actions'

type DatasetState = Dataset

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
