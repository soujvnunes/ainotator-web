import { type StoreState } from '@/lib/store'

export default function selectCurrentLicenseId(state: StoreState) {
  return state.annotator.current.id.license
}
