import { type StoreState } from '@/lib/store'

export default function selectImages(state: StoreState) {
  return state.dataset.images
}
