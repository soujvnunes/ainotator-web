import type {
  DatasetCategory,
  DatasetInfo,
  DatasetLicense,
} from '@/actions/validateDataset'
import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

interface AnnotatorState {
  currentImageId: number | null
  info: DatasetInfo | null
  categories: DatasetCategory[]
  licenses: DatasetLicense[]
}

const initialState: AnnotatorState = {
  currentImageId: null,
  info: null,
  categories: [],
  licenses: [],
}

export default createSlice({
  name: 'annotator',
  initialState,
  reducers: {
    setCurrentImageId: (state, action: PayloadAction<number>) => ({
      ...state,
      currentImageId: action.payload,
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
