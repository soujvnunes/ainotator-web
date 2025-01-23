import HeaderControlsErase from './HeaderControlsErase'
import HeaderControlsSize from './HeaderControlsSize'

export default function HeaderControls() {
  return (
    <div className="flex">
      <HeaderControlsSize />
      <HeaderControlsErase />
    </div>
  )
}
