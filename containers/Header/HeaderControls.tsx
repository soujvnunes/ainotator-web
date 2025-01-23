import HeaderControlsEraser from './HeaderControlsEraser'
import HeaderControlsResizer from './HeaderControlsResizer'

export default function HeaderControls() {
  return (
    <div className="flex">
      <HeaderControlsResizer />
      <HeaderControlsEraser />
    </div>
  )
}
