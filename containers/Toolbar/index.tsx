import CategoriesAdd from './categories-add'
import CategoriesList from './categories-list'
import Controls from './controls'

export default function Toolbar() {
  return (
    <div className="flex h-16 items-center">
      <CategoriesAdd />
      <CategoriesList />
      <Controls />
    </div>
  )
}
