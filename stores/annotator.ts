import type {
  DatasetCategory,
  DatasetInfo,
  DatasetLicense,
} from '@/actions/validateDataset'
import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

interface AnnotatorState {
  isAnnotating: boolean
  info: DatasetInfo | null
  categories: DatasetCategory[]
  licenses: DatasetLicense[]
}

const initialState: AnnotatorState = {
  isAnnotating: false,
  info: null,
  categories: [],
  licenses: [],
}

export default createSlice({
  name: 'annotator',
  initialState,
  reducers: {
    setisAnnotating: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isAnnotating: action.payload,
    }),
    setInfo: (state, action: PayloadAction<DatasetInfo>) => ({
      ...state,
      info: action.payload,
    }),
    addCategory: (state, action: PayloadAction<DatasetCategory>) => ({
      ...state,
      categories: [...state.categories, action.payload],
    }),
    addLicense: (state, action: PayloadAction<DatasetLicense>) => ({
      ...state,
      licenses: [...state.licenses, action.payload],
    }),
  },
})
