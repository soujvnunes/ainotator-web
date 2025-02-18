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

      const data = new FormData(event.currentTarget)
      const entries = Object.fromEntries(data.entries()) as O
      const fieldsValues = Object.values(entries)

      if (fieldsValues.some((field) => !field)) {
        const emptyFields = Object.entries(entries).reduce(
          (acc, [field, value]) => [...acc, !value ? (field as K) : null],
          [] as (K | null)[],
        )

        return setEmpty(emptyFields.filter(Boolean) as K[])
      }

      setEmpty([])
      formSubmit(entries)
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
