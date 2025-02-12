import annotatorColors from '@/consts/annotatorColors'

import AnnotationRadio from '@/components/AnnotationRadio'

export default annotatorColors.value.map((color) => (
  <AnnotationRadio
    compact
    key={color}
    value={color}
    color={color}
    aria-label={color}
  />
))
