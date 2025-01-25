import ControlsEraser from './ControlsEraser'
import ControlsResizer from './ControlsResizer'

export default function Controls() {
  return (
    <div className="flex">
      <ControlsResizer />
      <ControlsEraser />
    </div>
  )
}
