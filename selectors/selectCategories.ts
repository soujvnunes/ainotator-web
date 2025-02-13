import { type StoreState } from '@/lib/store'

export default function selectCategories(state: StoreState) {
  return state.annotator.categories
}
