import Add from './Add'
import Categories from './Categories'

export default function Toolbar() {
  return (
    <div className="flex h-16 items-center">
      <Add />
      <Categories />
    </div>
  )
}
