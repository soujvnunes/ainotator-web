import { createSelector, createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

import { type ErrorObject } from 'ajv'

import { type AnnotatorCrowds } from '@/consts/annotatorCrowds'
import { type AnnotatorTypes } from '@/consts/annotatorTypes'

import annotatorApi from '@/api/annotatorApi'

import { type DatasetCategory, type DatasetImage, type DatasetLicense } from './datasetSlice'

export interface AnnotatorCategory extends DatasetCategory {
  isCrowd: AnnotatorCrowds
  type: AnnotatorTypes
  color: `${number} ${number} ${number}`
}

export interface AnnotatorValidation {
  isValid?: boolean
  errors?: ErrorObject[]
}

/**
 * waiting: Onboarding screen on first-time access/after exporting previous annotations;
 * annotating: User selected a class name;
 * erasing: User switched to erase mode
 */
export type AnnotatorModes = 'waiting' | 'annotating' | 'erasing'

interface AnnotatorState {
  mode: AnnotatorModes
  size: { brush: number }
  categories: AnnotatorCategory[]
  validation?: AnnotatorValidation
  current: {
    id: {
      image: DatasetImage['id']
      license: DatasetLicense['id']
      category: DatasetCategory['id']
    }
  }
}

export default createSlice({
  name: 'annotator',
  initialState: {
    mode: 'waiting',
    size: { brush: 25 },
    categories: [],
    current: { id: { image: 0, license: 0, category: 0 } },
  } as AnnotatorState,
  reducers: {
    setMode: (state, action: PayloadAction<AnnotatorModes>) => {
      state.mode = action.payload
    },
    setBrushSize: (state, action: PayloadAction<number>) => {
      state.size.brush = action.payload
    },
    setImage: (state, action: PayloadAction<DatasetImage['id']>) => {
      state.current.id.image = action.payload
    },
    setLicense: (state, action: PayloadAction<DatasetLicense['id']>) => {
      state.current.id.license = action.payload
    },
    setCategory: (state, action: PayloadAction<DatasetCategory['id']>) => {
      state.current.id.category = action.payload
    },
    addCategory: (state, action: PayloadAction<AnnotatorCategory>) => {
      state.categories.push(action.payload)
    },
  },
  extraReducers(builder) {
    builder.addMatcher(annotatorApi.endpoints.validate.matchFulfilled, (state, action) => {
      state.validation = action.payload

      if (action.payload.isValid) {
        state.mode = 'waiting'
        state.current.id.category = 0
      }
    })
  },
  selectors: {
    brushWidth: (state) => state.size.brush,
    categories: (state) => state.categories,
    currentCategoryId: (state) => state.current.id.category,
    currentCategory: createSelector(
      (state: AnnotatorState) => state.current.id.category,
      (state: AnnotatorState) => state.categories,
      (id, categories) => {
        if (!id) return

        const currentCategory = categories.find((category) => id === category.id)

        if (!currentCategory?.color) return

        return {
          ...currentCategory,
          color: `rgb(${currentCategory.color} / 0.4)`,
        } as AnnotatorCategory
      },
    ),
    currentImageId: (state) => state.current.id.image,
    currentLicenseId: (state) => state.current.id.license,
    mode: (state) => state.mode,
    isAnnotating: (state) => state.mode === 'annotating',
    isWaiting: (state) => state.mode === 'waiting',
  },
})
