'use client'

import annotator, {
  type AnnotatorStore,
  createAnnotatorStore,
} from '@/stores/annotator'
import { createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'

type AnnotatorAPI = ReturnType<typeof createAnnotatorStore>

const AnnotatorContext = createContext<AnnotatorAPI | undefined>(undefined)

export default function AnnotatorProvider(props: React.PropsWithChildren) {
  const store = useRef<AnnotatorAPI>(null)

  if (!store.current) {
    store.current = createAnnotatorStore(annotator())
  }

  return (
    <AnnotatorContext
      value={store.current}
      {...props}
    />
  )
}

export function useAnnotator<T>(selector: (store: AnnotatorStore) => T): T {
  const annotator = useContext(AnnotatorContext)

  if (!annotator) throw new Error('Use annotator hook within AnnotatorProvider')

  return useStore(annotator, selector)
}
