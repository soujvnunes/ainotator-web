import { Canvas } from 'fabric'
import type { Path } from 'fabric'

interface AnnotationOptions {
  isCrowded?: boolean
  id: Record<'category' | 'image' | 'annotation', number>
}

export default function buildAnnotation(
  canvas: Canvas,
  options: AnnotationOptions,
) {
  const objects = canvas.getObjects()
  const brush = objects.find((object): object is Path => object.isType('path'))

  if (brush) {
    const { width, height } = brush.getBoundingRect()

    return {
      segmentation: brush.path.map(([cmd, ...points]) => points),
      area: width * height,
      iscrowd: options.isCrowded ? 1 : 0,
      image_id: options.id.image,
      bbox: [brush.left, brush.top, width, height],
      category_id: options.id.category,
      id: options.id.annotation,
    }
  }
}
