'use client'

import {
  makeStore,
  type AppDispatch,
  type AppStore,
  type RootState,
} from '@/stores'
import annotator from '@/stores/annotator'
import dataset from '@/stores/dataset'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

export const useAnnotatorState = useSelector.withTypes<RootState>()

export function useAnnotatorDispatch() {
  const dispatch = useDispatch<AppDispatch>()

  return bindActionCreators(
    { ...annotator.actions, ...dataset.actions },
    dispatch,
  )
}

export default function AnnotatorProvider({
  children,
}: React.PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
