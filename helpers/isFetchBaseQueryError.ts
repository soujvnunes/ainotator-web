import { type FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export default function isFetchBaseQueryError(params: unknown): params is FetchBaseQueryError {
  return (
    params != null &&
    typeof params === 'object' &&
    'status' in params &&
    typeof params.status === 'number'
  )
}
