import ActionsAddInfo from './actions-add-info'
import ActionsExport from './actions-export'

export default function Actions() {
  return (
    <div className="flex">
      <ActionsAddInfo />
      <ActionsExport />
    </div>
  )
}
