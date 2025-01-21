'use client'

import getDatasetImage from '@/helpers/getDatasetImage'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import {
  useAnnotatorState,
  useAnnotatorDispatch,
} from '@/providers/AnnotatorProvider'
import { FabricImage } from 'fabric'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export default function AnnotatorCanvasUploader() {
  const file = useAnnotatorState((state) => state.annotator.file)
  const dispatch = useAnnotatorDispatch()
  const annotatorRefs = useAnnotatorRefs()
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      const reader = new FileReader()

      if (file == null) return

      reader.onload = async (event) => {
        const result = event.target?.result
        const canvas = annotatorRefs.canvas.current

        if (typeof result !== 'string' || canvas == null) return

        const image = await FabricImage.fromURL(result)
        // TODO: send to dataset provider
        const datasetImage = getDatasetImage({
          name: file.name,
          lastModified: file.lastModified,
          height: image.height,
          width: image.width,
          id: {
            image: file.lastModified,
            license: 0,
          },
        })

        const ratio = {
          x: canvas.width / image.width,
          y: canvas.height / image.height,
        }

        if (ratio.x > ratio.y) image.scaleToWidth(canvas.width)
        else image.scaleToHeight(canvas.height)

        image.selectable = false
        image.hasControls = false
        canvas.add(image)
        canvas.renderAll()

        annotatorRefs.image.current = image
        dispatch.setFile(true)
      }
      reader.readAsDataURL(file)
    },
    [],
  )

  return (
    <label
      className={twMerge(
        'absolute flex w-full h-full cursor-pointer',
        !file && 'z-10',
        file && 'opacity-0',
      )}>
      <span className="m-auto">Add a file</span>
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        disabled={file}
        onChange={handleFileChange}
      />
    </label>
  )
}
