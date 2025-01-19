// TODO: remove directive after component client ui
'use client'

import NextImage from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')

  return (
    <main>
      {url}
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.item(0)

          if (file) {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                setUrl(reader.result)
              }
            }
          }
        }}
      />
      {!!url && (
        <div className="relative h-24">
          <NextImage
            fill
            className="object-cover"
            alt="Preview"
            src={url}
          />
        </div>
      )}
    </main>
  )
}
