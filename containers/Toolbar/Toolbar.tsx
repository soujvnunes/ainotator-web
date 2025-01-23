import ToolbarAdd from './ToolbarAdd'
import ToolbarCategories from './ToolbarCategories'
import ToolbarExport from './ToolbarExport'

export default function Toolbar() {
  return (
    <div className="flex items-center h-16">
      <ToolbarAdd />
      <ToolbarCategories />
      <ToolbarExport />
    </div>
  )
}
