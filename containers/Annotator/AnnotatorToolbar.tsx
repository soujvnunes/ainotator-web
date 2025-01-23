import AnnotatorToolbarAdd from './AnnotatorToolbarAdd'
import AnnotatorToolbarCategories from './AnnotatorToolbarCategories'
import AnnotatorToolbarExport from './AnnotatorToolbarExport'

export default function AnnotatorToolbar() {
  return (
    <div className="flex items-center h-16">
      <AnnotatorToolbarAdd />
      <AnnotatorToolbarCategories />
      <AnnotatorToolbarExport />
    </div>
  )
}
