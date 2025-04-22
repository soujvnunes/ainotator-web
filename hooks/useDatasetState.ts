'use client'

import datasetSlice from '@/slices/datasetSlice'

import useAppState from './useAppState'

export default function useDatasetState() {
  const licenses = useAppState(datasetSlice.selectors.licenses)
  const categories = useAppState(datasetSlice.selectors.categories)
  const images = useAppState(datasetSlice.selectors.images)
  const annotations = useAppState(datasetSlice.selectors.annotations)
  const info = useAppState(datasetSlice.selectors.info)

  return { licenses, categories, images, annotations, info }
}
