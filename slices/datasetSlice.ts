import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type ErrorObject } from 'ajv'

import { type AnnotatorCategory } from './annotatorSlice'

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

export interface DatasetValidation {
  isValid: boolean
  errors?: ErrorObject[]
}

export interface DatasetState {
  licenses: DatasetLicense[]
  images: DatasetImage[]
  annotations: DatasetAnnotation[]
  categories: DatasetCategory[]
  info: DatasetInfo
  validation: DatasetValidation
}

export const datasetApi = createApi({
  reducerPath: 'datasetApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    validate: build.mutation<DatasetValidation, Omit<DatasetState, 'validation'>>({
      query: (dataset) => ({
        url: '/validate-dataset',
        method: 'POST',
        body: dataset,
      }),
    }),
  }),
})

export default createSlice({
  name: 'dataset',
  initialState: {
    licenses: [],
    images: [],
    annotations: [],
    categories: [],
    info: { description: '', url: '', version: '', year: 0, contributor: '', date_created: '' },
    validation: { isValid: false, errors: [] },
  } as DatasetState,
  reducers: {
    setInfo: (state, action: PayloadAction<DatasetInfo>) => {
      state.info = action.payload
    },
    addLicense: (state, action: PayloadAction<DatasetLicense>) => {
      state.licenses.push(action.payload)
    },
    addImage: (state, action: PayloadAction<DatasetImage>) => {
      state.images.push(action.payload)
    },
    setImage: (state, action: PayloadAction<Partial<DatasetImage> & { id: DatasetImage['id'] }>) => {
      const image = state.images.find(({ id }) => id === action.payload.id)

      if (image) Object.assign(image, action.payload)
    },
    addAnnotation: (state, action: PayloadAction<DatasetAnnotation>) => {
      state.annotations.push(action.payload)
    },
    addCategory: {
      reducer: (state, action: PayloadAction<DatasetCategory>) => {
        state.categories.push(action.payload)
      },
      prepare: ({ isCrowd, color, type, ...payload }: AnnotatorCategory) => ({ payload }),
    },
  },
  extraReducers(builder) {
    builder.addMatcher(datasetApi.endpoints.validate.matchFulfilled, (state, action) => {
      state.validation = action.payload
    })
  },
  selectors: {
    annotations: (state) => state.annotations,
    hasInfo: (state) => Object.values(state.info).some(Boolean),
    info: (state) => state.info,
    licenses: (state) => state.licenses,
    licensesFields: (state) =>
      state.licenses.map((license) => ({
        value: license.id,
        children: license.name,
      })),
    images: (state) => state.images,
  },
})
