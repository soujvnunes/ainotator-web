import { MagnifyingGlassMinusIcon } from '@heroicons/react/24/solid'

import { IconButton } from '@/ui'

export default function ControlsZoomOut() {
  return (
    <IconButton aria-label="Start zooming the current image out">
      <MagnifyingGlassMinusIcon className="size-6" />
    </IconButton>
  )
}
