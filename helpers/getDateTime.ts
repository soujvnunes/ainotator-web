export default function getDateTime(lastModified: number) {
  const [date, time] = new Date(lastModified).toISOString().split(/T|\./)

  return `${date} ${time}`
}
