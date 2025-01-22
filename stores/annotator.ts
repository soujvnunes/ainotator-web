import type {
  DatasetCategory,
  DatasetInfo,
  DatasetLicense,
} from '@/actions/validateDataset'
import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

export type Category = 'brush' | 'polygon'

export type AnnotatorStateAction =
  | { name: 'waiting' }
  | { name: 'editting' }
  | { name: 'annotating'; category: Category }
  | { name: 'exporting' }

interface AnnotatorState {
  /**
   * TODO: this is the object DatasetCategory to be setted
   * in dispatch.dataset.addCategory on select
   */
  action: AnnotatorStateAction
  added: {
    categories: DatasetCategory[]
  }
  previous: {
    info: DatasetInfo | null
    licenses: DatasetLicense[]
  }
}

const initialState: AnnotatorState = {
  action: {
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
    setAction: (state, action: PayloadAction<AnnotatorStateAction>) => ({
      ...state,
      action: action.payload,
    }),
    addCategory: (state, action: PayloadAction<DatasetCategory>) => ({
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
