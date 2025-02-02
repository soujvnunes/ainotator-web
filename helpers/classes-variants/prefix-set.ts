export type BooleanObject<K extends string> = Record<K, boolean>

export default function prefixSet<A extends string, K extends string>(
  prefix: A,
  set?: BooleanObject<K>,
): Record<`${A}-${K}`, boolean | undefined> | undefined {
  if (!set) return

  const setEntries = Object.entries<boolean>(set) as [K, boolean][]
  const entries = setEntries.map(([key, value]) => [
    `${prefix}-${key}`,
    value || undefined,
  ]) as [`${A}-${K}`, boolean | undefined][]

  return Object.fromEntries(entries) as Record<`${A}-${K}`, boolean | undefined>
}
