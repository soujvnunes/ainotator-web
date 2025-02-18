export default function parseString(params?: string | number) {
  if (typeof params === 'undefined') return 0

  if (typeof params === 'string') return Number(params)

  return params
}
