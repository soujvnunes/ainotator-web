import annotatorSlice from '@/lib/annotatorSlice'
import datasetSlice from '@/lib/datasetSlice'
import type { AppDispatch } from '@/lib/getConfigureStore'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

export default function useAppDispatch() {
  const dispatch = useDispatch<AppDispatch>()

  return {
    annotator: bindActionCreators(annotatorSlice.actions, dispatch),
    dataset: bindActionCreators(datasetSlice.actions, dispatch),
  }
}
