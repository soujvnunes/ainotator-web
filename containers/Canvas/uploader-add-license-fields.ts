export interface UploaderAddLicenseFields {
  name: string
  url: string
}

const uploaderAddLicenseFields = [
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
] as const

export default uploaderAddLicenseFields
