import ToolbarAdd from './ToolbarAdd'
import ToolbarCategories from './ToolbarCategories'

export default function Toolbar() {
  return (
    <div className="flex items-center h-16">
      <ToolbarAdd />
      <ToolbarCategories />
    </div>
  )
}
