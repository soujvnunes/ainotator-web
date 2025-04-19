import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { DatasetState, DatasetValidation } from '@/slices/datasetSlice'

export default createApi({
  reducerPath: 'datasetApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    validate: build.mutation<DatasetValidation, Omit<DatasetState, 'validation'>>({
      query: (dataset) => ({
        url: '/validate-dataset',
        method: 'POST',
        body: dataset,
      }),
    }),
  }),
})
