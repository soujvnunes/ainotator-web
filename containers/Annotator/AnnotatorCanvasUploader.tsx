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
  const mode = useAnnotatorState((state) => state.annotator.current.mode)
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
        const imageId = file.lastModified
        const datasetImage = getDatasetImage({
          name: file.name,
          lastModified: imageId,
          height: image.height,
          width: image.width,
          id: {
            image: imageId,
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
        annotatorRefs.image.current = image
        canvas.add(image)
        canvas.renderAll()
        dispatch.annotator.setMode('editting')
        dispatch.dataset.addImage(datasetImage)
      }
      reader.readAsDataURL(file)
    },
    [],
  )

  return (
    <label
      className={twMerge(
        'absolute flex w-full h-full cursor-pointer opacity-0',
        mode === 'waiting' && 'z-10 opacity-100',
      )}>
      <span className="m-auto">Add a file</span>
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        disabled={mode !== 'waiting'}
        onChange={handleFileChange}
      />
    </label>
  )
}
