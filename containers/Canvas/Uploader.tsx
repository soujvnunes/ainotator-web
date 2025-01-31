'use client'

import { useCallback } from 'react'

import { FabricImage } from 'fabric'

import { annotator, dataset } from '@/reducers'

import { cx, getDateTime } from '@/helpers'

import {
  useEnhancedId,
  useRefs,
  useStoreDispatch,
  useStoreState,
} from '@/hooks'

import UploaderOnboarding from './uploader-onboarding'

const rootXs = cx(
  'absolute flex h-full w-full cursor-pointer opacity-0 data-[waiting]:z-10 data-[waiting]:opacity-100',
)

export default function Uploader() {
  const dispatch = useStoreDispatch()
  const annotatorRefs = useRefs()
  const [id, nextId] = useEnhancedId()
  const mode = useStoreState((state) => state.annotator.mode)
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      const reader = new FileReader()

      if (file == null) return

      reader.onload = async (event) => {
        const result = event.target?.result
        const canvas = annotatorRefs.canvas.current

        if (typeof result !== 'string' || !canvas) return

        /**
         * TODO: implement /canvas page as router and pass image as query
         *
         * router.replace({ pathname: '/canvas', query: { image }})
         *
         * this will remove the need for annotatorRefs.image.current
         */
        const image = await FabricImage.fromURL(result)
        const imageDataset = {
          // TODO: fill in the license form right after editting mode
          license: 0,
          file_name: file.name,
          height: image.height,
          width: image.width,
          date_captured: getDateTime(file.lastModified),
          coco_url: '',
          flickr_url: '',
          id,
        }
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
        dispatch(annotator.actions.setMode('editting'))
        dispatch(dataset.actions.addImage(imageDataset))
        nextId()
      }
      reader.readAsDataURL(file)
    },
    [annotatorRefs.canvas, annotatorRefs.image, dispatch, id, nextId],
  )

  return (
    <label {...rootXs({ waiting: mode === 'waiting' })}>
      <UploaderOnboarding />
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
