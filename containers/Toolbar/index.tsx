import CategoriesAdd from './categories-add'
import CategoriesList from './categories-list'

export default function Toolbar() {
  return (
    <div className="flex items-center h-16">
      <CategoriesAdd />
      <CategoriesList />
    </div>
  )
}
