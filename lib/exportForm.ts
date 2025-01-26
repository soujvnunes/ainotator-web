export const tabs = [
  { name: 'license', label: 'License' },
  { name: 'info', label: 'Information' },
] as const

export const fields = [
  {
    tab: 'license',
    label: 'Label',
    name: 'name',
    placeholder: 'Attribution-NonCommercial-ShareAlike License',
  },
  {
    tab: 'license',
    label: 'URL',
    name: 'url',
    placeholder: 'http://creativecommons.org/licenses/by-nc-sa/2.0/',
  },
  {
    tab: 'info',
    label: 'Description',
    name: 'description',
    placeholder: 'COCO 2017 Dataset',
  },
  {
    tab: 'info',
    label: 'URL',
    name: 'url',
    placeholder: 'http://cocodataset.org',
  },
  {
    tab: 'info',
    label: 'Version',
    name: 'version',
    placeholder: '1',
  },
  {
    tab: 'info',
    label: 'Year',
    name: 'year',
    placeholder: '2017',
  },
  {
    tab: 'info',
    label: 'Contributor',
    name: 'contributor',
    placeholder: 'COCO Consortium',
  },
  {
    tab: 'info',
    label: 'Date created',
    name: 'date_created',
    placeholder: '2017/09/01',
  },
] as const
