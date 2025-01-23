import type {
  DatasetCategory,
  DatasetInfo,
  DatasetLicense,
} from '@/actions/validateDataset'
import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

export const annotatorCategoryType = ['brush', 'polygon'] as const
export const annotatorCategoryCrowds = ['yes', 'no'] as const

export type AnnotatorCategoryType = (typeof annotatorCategoryType)[number]

export type AnnotatorCategoryCrowds = (typeof annotatorCategoryCrowds)[number]

export interface AnnotatorCategory extends DatasetCategory {
  isCrowd: AnnotatorCategoryCrowds
  type: AnnotatorCategoryType
  color: string
}

export type AnnotatorCurrent =
  | { mode: 'waiting'; category?: undefined }
  | { mode: 'editting'; category?: undefined }
  | { mode: 'annotating'; category: AnnotatorCategory }
  | { mode: 'exporting'; category?: undefined }

interface AnnotatorState {
  current: AnnotatorCurrent
  added: {
    categories: AnnotatorCategory[]
  }
  previous: {
    info: DatasetInfo | null
    licenses: DatasetLicense[]
  }
}

const initialState: AnnotatorState = {
  current: {
    mode: 'waiting',
  },
  added: {
    categories: [],
  },
  previous: {
    info: null,
    licenses: [],
  },
}

export default createSlice({
  name: 'annotator',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<AnnotatorCurrent>) => ({
      ...state,
      current: action.payload,
    }),
    addCategory: (state, action: PayloadAction<AnnotatorCategory>) => ({
      ...state,
      added: {
        ...state.added,
        categories: [...state.added.categories, action.payload],
      },
    }),
    setInfo: (state, action: PayloadAction<DatasetInfo>) => ({
      ...state,
      previous: { ...state.previous, info: action.payload },
    }),
    addLicense: (state, action: PayloadAction<DatasetLicense>) => ({
      ...state,
      previous: {
        ...state.previous,
        licenses: [...state.previous.licenses, action.payload],
      },
    }),
  },
})
