import Add from './add-category'
import Categories from './categories'

export default function Toolbar() {
  return (
    <div className="flex items-center h-16">
      <Add />
      <Categories />
    </div>
  )
}
