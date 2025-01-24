interface ValidationSuccessful {
  name: 'Success'
}

export default function isValidationSuccessful(
  params: unknown,
): params is ValidationSuccessful {
  return (
    params != null &&
    typeof params === 'object' &&
    'message' in params &&
    params.message === 'Success'
  )
}
