export const fieldsInitialState = {
  license: {
    url: '',
    name: '',
  },
  info: {
    description: '',
    url: '',
    version: '',
    year: 0,
    contributor: '',
    date_created: '',
  },
}
export const tabs = [
  {
    name: 'License',
    fields: [
      {
        label: 'Label',
        name: 'name',
        placeholder: 'Attribution-NonCommercial-ShareAlike License',
      },
      {
        label: 'URL',
        name: 'url',
        placeholder: 'http://creativecommons.org/licenses/by-nc-sa/2.0/',
      },
    ],
  },
  {
    name: 'Information',
    fields: [
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
    ],
  },
]
