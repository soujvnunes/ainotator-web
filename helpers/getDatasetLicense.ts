interface DatasetLicenseProps {
  id: number
}

export default function getDatasetLicense({ id }: DatasetLicenseProps) {
  return {
    id,
    url: '',
    name: 'Internal usage',
  }
}
