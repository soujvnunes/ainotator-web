import ControlsEraser from './controls-eraser'
import ControlsResizer from './controls-resizer'

export default function Controls() {
  return (
    <div className="flex">
      <ControlsResizer />
      <ControlsEraser />
    </div>
  )
}
