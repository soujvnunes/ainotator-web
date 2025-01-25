import { AnnotatorCategoryCrowds } from '@/lib/annotatorSlice'
import { Canvas } from 'fabric'
import type { Path, Polygon } from 'fabric'

interface DatasetAnnotationOptions {
  isCrowd?: AnnotatorCategoryCrowds
  id: Record<'category' | 'image' | 'annotation', number>
}

export default function getDatasetAnnotation(
  canvas: Canvas,
  options: DatasetAnnotationOptions,
) {
  const objects = canvas.getObjects()
  const brush = objects.find((object): object is Path => object.isType('path'))
  const polygon = objects.find((object): object is Polygon =>
    object.isType('polygon'),
  )
  const isCrowd = options.isCrowd === 'yes' ? 1 : 0

  if (brush) {
    const { width, height } = brush.getBoundingRect()

    return {
      segmentation: brush.path.map(([, ...points]) => points),
      area: width * height,
      iscrowd: isCrowd,
      image_id: options.id.image,
      bbox: [brush.left, brush.top, width, height],
      category_id: options.id.category,
      id: options.id.annotation,
    }
  }

  if (polygon) {
    return {
      segmentation: [polygon.points.map((point) => [point.x, point.y]).flat()],
      area: polygon.width * polygon.height,
      iscrowd: isCrowd,
      image_id: options.id.image,
      bbox: [polygon.left, polygon.top, polygon.width, polygon.height],
      category_id: options.id.category,
      id: options.id.annotation,
    }
  }
}
