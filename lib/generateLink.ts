interface GenerateLinkProps {
  name: string
  value: object
}

export default function generateLink(props: GenerateLinkProps) {
  const blob = new Blob([JSON.stringify(props.value, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = window.document.createElement('a')

  link.href = url
  link.download = props.name
  window.document.body.appendChild(link)
  link.click()
  window.document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
