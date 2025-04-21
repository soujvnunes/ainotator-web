'use client'

import { useCallback, useState } from 'react'

export default function useFormSubmit<
  O extends Record<K, string | number>,
  K extends keyof O = keyof O,
>(formSubmit: (fields: O) => void) {
  const [empty, setEmpty] = useState<K[]>([])
  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const entries = new FormData(event.currentTarget).entries()

      if (entries.some((entry) => !entry[1])) {
        return setEmpty(
          entries.reduce((acc, [key, value]) => (!value ? [...acc, key as K] : acc), [] as K[]),
        )
      }

      setEmpty([])
      formSubmit(Object.fromEntries(entries) as O)
    },
    [formSubmit],
  )

  return {
    fields: {
      empty,
    },
    onSubmit,
  }
}
