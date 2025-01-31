import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

import type { DatasetCategory, DatasetImage, DatasetLicense } from '@/actions'

import type { AnnotatorColors, AnnotatorCrowds, AnnotatorTypes } from '@/lib'

export interface AnnotatorCategory extends DatasetCategory {
  isCrowd: AnnotatorCrowds
  type: AnnotatorTypes
  color: AnnotatorColors
}

export type AnnotatorModes =
  // Onboarding screen on first-time access/after exporting previous annotations
  | 'waiting'
  // User uploaded an currentImageId, but didn't select a class name yet
  | 'editting'
  // User selected a class name
  | 'annotating'
  // User switched to erase mode
  | 'erasing'
  // User clicked on Export icon button
  | 'exporting'

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

const initialState: AnnotatorState = {
  mode: 'waiting',
  size: { brush: 25 },
  categories: [],
  current: { id: { image: 0, license: 0, category: 0 } },
}

export default createSlice({
  name: 'annotator',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<AnnotatorModes>) => ({
      ...state,
      mode: action.payload,
    }),
    setBrushSize: (state, action: PayloadAction<number>) => ({
      ...state,
      size: { ...state.size, brush: action.payload },
    }),
    setImage: (state, action: PayloadAction<DatasetImage['id']>) => ({
      ...state,
      current: {
        ...state.current,
        id: { ...state.current.id, image: action.payload },
      },
    }),
    setLicense: (state, action: PayloadAction<DatasetLicense['id']>) => ({
      ...state,
      current: {
        ...state.current,
        id: { ...state.current.id, license: action.payload },
      },
    }),
    setCategory: (state, action: PayloadAction<DatasetCategory['id']>) => ({
      ...state,
      current: {
        ...state.current,
        id: { ...state.current.id, category: action.payload },
      },
    }),
    addCategory: (state, action: PayloadAction<AnnotatorCategory>) => ({
      ...state,
      categories: [...state.categories, action.payload],
    }),
  },
})
