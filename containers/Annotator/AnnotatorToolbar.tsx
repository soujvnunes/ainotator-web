import AnnotatorToolbarAdd from './AnnotatorToolbarAdd'
import AnnotatorToolbarExport from './AnnotatorToolbarExport'
import AnnotatorToolbarModes from './AnnotatorToolbarModes'
import { TOOLBAR_Y } from './annotatorToolbar.utils'

export default function AnnotatorToolbar() {
  return (
    <div
      style={{ height: TOOLBAR_Y }}
      className="flex items-center justify-between">
      <AnnotatorToolbarAdd />
      <AnnotatorToolbarModes />
      <AnnotatorToolbarExport />
    </div>
  )
}
