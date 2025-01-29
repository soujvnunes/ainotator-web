import type {
  DatasetCategory,
  DatasetInfo,
  DatasetLicense,
} from '@/actions/validateDataset'
import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

// prettier-ignore
export const annotatorColors = {
  bg: { red: 'bg-red-500', orange: 'bg-orange-500', yellow: 'bg-yellow-500', green: 'bg-green-500', teal: 'bg-teal-500', sky: 'bg-sky-500', indigo: 'bg-indigo-500', purple: 'bg-purple-500', pink: 'bg-pink-500', neutral: 'bg-neutral-500' },
  text: { red: 'group-data-[checked]:text-red-500', orange: 'group-data-[checked]:text-orange-500', yellow: 'group-data-[checked]:text-yellow-500', green: 'group-data-[checked]:text-green-500', teal: 'group-data-[checked]:text-teal-500', sky: 'group-data-[checked]:text-sky-500', indigo: 'group-data-[checked]:text-indigo-500', purple: 'group-data-[checked]:text-purple-500', pink: 'group-data-[checked]:text-pink-500', neutral: 'group-data-[checked]:text-neutral-500' },
  channel: { red: '239 68 68', orange: '249 115 22', yellow: '132 204 22', green: '34 197 94', teal: '20 184 166', sky: '14 165 233', indigo: '99 102 241', purple: '168 85 247', pink: '236 72 153', neutral: '115 115 115' },
} as const
// prettier-ignore
export const annotatorCategoryColors = ['red', 'orange', 'yellow', 'green', 'teal', 'sky', 'indigo', 'purple', 'pink', 'neutral'] as const
export const annotatorCategoryTypes = ['brush', 'polygon'] as const
export const annotatorCategoryCrowds = ['yes', 'no'] as const

export type AnnotatorCategoryTypes = (typeof annotatorCategoryTypes)[number]
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
