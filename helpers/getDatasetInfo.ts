export default function getDatasetInfo() {
  const [date] = new Date().toISOString().split('T')
  const [year] = date.split('-')

  return {
    description: 'Custom COCO Dataset',
    url: '',
    version: '1.0',
    year,
    contributor: 'AINotator',
    date_created: date,
  }
}
