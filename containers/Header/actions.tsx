import ActionsAddInfo from './ActionsAddInfo'
import ActionsExport from './ActionsExport'
import ActionsLicenses from './ActionsLicenses'

export default function Actions() {
  return (
    <div className="flex">
      <ActionsLicenses />
      <ActionsAddInfo />
      <ActionsExport />
    </div>
  )
}
