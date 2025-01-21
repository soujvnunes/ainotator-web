import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'

interface AnnotatorState {
  file: boolean
}

const initialState: AnnotatorState = {
  file: false,
}

export default createSlice({
  name: 'annotator',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<AnnotatorState['file']>) => ({
      ...state,
      file: action.payload,
    }),
  },
})
