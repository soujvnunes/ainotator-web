import CategoriesAdd from './CategoriesAdd'
import CategoriesList from './CategoriesList'
import Controls from './_controls'

export default function Toolbar() {
  return (
    <div className="flex h-16 items-center">
      <CategoriesAdd />
      <CategoriesList />
      <Controls />
    </div>
  )
}
