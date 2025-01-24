interface DatasetImageProps {
  name: string
  width: number
  height: number
  lastModified: number
  id: Record<'image' | 'license', number>
}

export default function getDatasetImage({
  height,
  id,
  lastModified,
  name,
  width,
}: DatasetImageProps) {
  const [date, time] = new Date(lastModified).toISOString().split(/T|\./)

  return {
    license: id.license, // TODO: would the owner provide it?
    file_name: name,
    height,
    width,
    date_captured: `${date} ${time}`,
    coco_url: '', // TODO: this is a local file
    flickr_url: '', // TODO: this is a local file
    id: id.image,
  }
}
