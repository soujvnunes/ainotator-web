import type {
  DatasetCategory,
  DatasetInfo,
  DatasetLicense,
} from '@/actions/validateDataset'
import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

export type Category = 'brush' | 'polygon'

export interface AnnotatorCategory extends DatasetCategory {
  type: Category
  color: string
}

export type AnnotatorMode =
  | { name: 'waiting' }
  | { name: 'editting' }
  | { name: 'annotating'; category: AnnotatorCategory }
  | { name: 'exporting' }

interface AnnotatorState {
  /**
   * TODO: this is the object DatasetCategory to be setted
   * in dispatch.dataset.addCategory on select
   */
  mode: AnnotatorMode
  added: {
    categories: AnnotatorCategory[]
  }
  previous: {
    info: DatasetInfo | null
    licenses: DatasetLicense[]
  }
}

const initialState: AnnotatorState = {
  mode: {
    name: 'waiting',
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
    setMode: (state, action: PayloadAction<AnnotatorMode>) => ({
      ...state,
      mode: action.payload,
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
