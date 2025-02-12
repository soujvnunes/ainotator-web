export interface ActionsAddInfoFields {
  description: string
  url: string
  version: string
  year: string
  contributor: string
  date_created: string
}

const actionsAddInfoFields = [
  {
    label: 'Description',
    name: 'description',
    placeholder: 'COCO 2017 Dataset',
  },
  {
    label: 'URL',
    name: 'url',
    placeholder: 'http://cocodataset.org',
  },
  {
    label: 'Version',
    name: 'version',
    placeholder: '1',
  },
  {
    label: 'Year',
    name: 'year',
    placeholder: '2017',
  },
  {
    label: 'Contributor',
    name: 'contributor',
    placeholder: 'COCO Consortium',
  },
  {
    label: 'Date created',
    name: 'date_created',
    placeholder: '2017/09/01',
  },
] as const

export default actionsAddInfoFields
