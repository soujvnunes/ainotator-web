import AnnotatorToolbarAdd from './AnnotatorToolbarAdd'
import AnnotatorToolbarCategories from './AnnotatorToolbarCategories'
import AnnotatorToolbarExport from './AnnotatorToolbarExport'
import { TOOLBAR_Y } from './annotatorToolbar.utils'

export default function AnnotatorToolbar() {
  return (
    <div
      style={{ height: TOOLBAR_Y }}
      className="flex items-center">
      <AnnotatorToolbarAdd />
      <AnnotatorToolbarCategories />
      <AnnotatorToolbarExport />
    </div>
  )
}
