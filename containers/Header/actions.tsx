import ActionsAddInfo from './actions-add-info'
import ActionsExport from './actions-export'
import ActionsSelectLicense from './actions-select-license'

export default function Actions() {
  return (
    <div className="flex">
      <ActionsSelectLicense />
      <ActionsAddInfo />
      <ActionsExport />
    </div>
  )
}
