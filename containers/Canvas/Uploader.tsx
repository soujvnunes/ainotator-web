'use client'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useCanvasRefs from '@/hooks/useCanvasRefs'
import getDatasetImage from '@/lib/getDatasetImage'
import {
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  PaintBrushIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { FabricImage } from 'fabric'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Uploader() {
  const mode = useAppState((state) => state.annotator.current.mode)
  const dispatch = useAppDispatch()
  const annotatorRefs = useCanvasRefs()
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
        'absolute flex h-full w-full cursor-pointer opacity-0',
        mode === 'waiting' && 'z-10 opacity-100',
      )}>
      <h2 className="m-auto flex flex-col items-center text-center text-4xl lg:text-6xl">
        <p className="text-xs font-medium uppercase tracking-wide text-white/60">
          AINotator WEB
        </p>
        Start by adding <br /> an image
        <ul className="mt-4 inline-flex flex-col items-center text-white/60">
          <li className="flex items-center text-base">
            <span className="mr-2 flex h-8 w-8 bg-white">
              <DocumentArrowUpIcon className="m-auto h-6 w-6 fill-black" />
            </span>
            Pick a image
          </li>
          <li className="flex items-center text-base">
            <span className="mr-2 flex h-8 w-8 bg-white">
              <PlusIcon className="m-auto h-6 w-6 fill-black" />
            </span>
            Add class names
          </li>
          <li className="flex items-center text-base">
            <span className="mr-2 flex h-8 w-8 bg-white">
              <PaintBrushIcon className="m-auto h-6 w-6 fill-black" />
            </span>
            Annotate your image
          </li>
          <li className="flex items-center text-base">
            <span className="mr-2 flex h-8 w-8 bg-white">
              <DocumentArrowDownIcon className="m-auto h-6 w-6 fill-black" />
            </span>
            Export in the COCO format
          </li>
        </ul>
      </h2>
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
