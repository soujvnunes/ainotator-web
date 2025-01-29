import type {
  DatasetCategory,
  DatasetInfo,
  DatasetLicense,
} from '@/actions/validateDataset'
import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

// prettier-ignore
export const annotatorCategoryColors = ['red', 'orange', 'yellow', 'green', 'sky', 'indigo', 'purple', 'pink', 'neutral'] as const
export const annotatorCategoryType = ['brush', 'polygon'] as const
export const annotatorCategoryCrowds = ['yes', 'no'] as const

export type AnnotatorCategoryTypes = (typeof annotatorCategoryType)[number]
export type AnnotatorCategoryCrowds = (typeof annotatorCategoryCrowds)[number]
export type AnnotatorCategoryColors = (typeof annotatorCategoryColors)[number]

export interface AnnotatorCategory extends DatasetCategory {
  isCrowd: AnnotatorCategoryCrowds
  type: AnnotatorCategoryTypes
  color: AnnotatorCategoryColors
}

// prettier-ignore
export type AnnotatorCurrentModes = 'waiting' | 'editting' | 'annotating' | 'erasing' | 'exporting'

export type AnnotatorCurrentSize = {
  brush: number
}

interface AnnotatorState {
  current: {
    mode: AnnotatorCurrentModes
    category: Pick<AnnotatorCategory, 'id'>
    size: AnnotatorCurrentSize
  }
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
    category: { id: 0 },
    size: { brush: 25 },
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
    setMode: (state, action: PayloadAction<AnnotatorCurrentModes>) => ({
      ...state,
      current: { ...state.current, mode: action.payload },
    }),
    setCategory: (
      state,
      action: PayloadAction<Pick<AnnotatorCategory, 'id'>>,
    ) => ({
      ...state,
      current: { ...state.current, category: action.payload },
    }),
    setSize: (state, action: PayloadAction<AnnotatorCurrentSize>) => ({
      ...state,
      current: {
        ...state.current,
        size: { ...state.current.size, ...action.payload },
      },
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
