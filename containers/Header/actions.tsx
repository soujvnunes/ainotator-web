import ActionsAddInfo from './actions-add-info'
import ActionsExport from './actions-export'
import ActionsLicenses from './actions-licenses'

export default function Actions() {
  return (
    <div className="flex">
      <ActionsLicenses />
      <ActionsAddInfo />
      <ActionsExport />
    </div>
  )
}
