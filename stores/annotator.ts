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

export type AnnotatorCurrentModes =
  | 'waiting'
  | 'editting'
  | 'annotating'
  | 'exporting'

export type AnnotatorCurrentSize = {
  brush: number
}

interface AnnotatorState {
  current: {
    mode: AnnotatorCurrentModes
    category?: AnnotatorCategory
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
    size: {
      brush: 40,
    },
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
    setMode: (state, action: PayloadAction<AnnotatorCurrentModes>) => {
      const newMode = action.payload

      return {
        ...state,
        current: {
          ...state.current,
          category:
            newMode !== 'annotating' ? undefined : state.current.category,
          mode: action.payload,
        },
      }
    },
    setCategory: (state, action: PayloadAction<AnnotatorCategory>) => ({
      ...state,
      current: { ...state.current, category: action.payload },
    }),
    unsetCategory: (state) => ({
      ...state,
      current: { ...state.current, category: undefined },
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
