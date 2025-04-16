import { createSelector, createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

import { type AnnotatorCrowds } from '@/consts/annotatorCrowds'
import { type AnnotatorTypes } from '@/consts/annotatorTypes'

import type { DatasetCategory, DatasetImage, DatasetLicense } from './datasetSlice'

export interface AnnotatorCategory extends DatasetCategory {
  isCrowd: AnnotatorCrowds
  type: AnnotatorTypes
  color: `${number} ${number} ${number}`
}

export type AnnotatorModes =
  // Onboarding screen on first-time access/after exporting previous annotations
  | 'waiting'
  // User selected a class name
  | 'annotating'
  // User switched to erase mode
  | 'erasing'

interface AnnotatorState {
  mode: AnnotatorModes
  size: { brush: number }
  categories: AnnotatorCategory[]
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
        }
      },
    ),
    currentImageId: (state) => state.current.id.image,
    currentLicenseId: (state) => state.current.id.license,
    mode: (state) => state.mode,
    isAnnotating: (state) => state.mode === 'annotating',
    isWaiting: (state) => state.mode === 'waiting',
  },
})
