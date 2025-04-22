import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { type AnnotatorValidation } from '@/slices/annotatorSlice'
import { type DatasetState } from '@/slices/datasetSlice'

export default createApi({
  reducerPath: 'annotatorApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    validate: build.mutation<AnnotatorValidation, DatasetState>({
      query: (dataset) => ({
        url: '/validate-dataset',
        method: 'POST',
        body: dataset,
      }),
    }),
  }),
})
