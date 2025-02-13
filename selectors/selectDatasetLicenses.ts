import { type StoreState } from '@/lib/store'

export default function selectDatasetLicenses(state: StoreState) {
  return state.dataset.licenses
}
