import { Canvas } from 'fabric'
import type { Path, Polygon } from 'fabric'

export default function generateAnnotation(canvas: Canvas) {
  const objects = canvas.getObjects()
  const brush = objects.find((object): object is Path => object.isType('path'))
  const polygon = objects.find((object): object is Polygon => object.isType('polygon'))

  if (brush) {
    const { width, height } = brush.getBoundingRect()

    return {
      segmentation: brush.path.map(([, ...points]) => points),
      area: width * height,
      bbox: [brush.left, brush.top, width, height],
    }
  }

  if (polygon) {
    return {
      segmentation: [polygon.points.map((point) => [point.x, point.y]).flat()],
      area: polygon.width * polygon.height,
      bbox: [polygon.left, polygon.top, polygon.width, polygon.height],
    }
  }
}
