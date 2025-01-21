import AnnotatorToolbarExport from './AnnotatorToolbarExport'
import AnnotatorToolbarModes from './AnnotatorToolbarModes'

export default function AnnotatorToolbar() {
  return (
    <div className="flex items-center justify-between h-16 px-4">
      <AnnotatorToolbarModes />
      <AnnotatorToolbarExport />
    </div>
  )
}
