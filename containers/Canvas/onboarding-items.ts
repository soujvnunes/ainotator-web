import {
  DocumentArrowDownIcon,
  PaintBrushIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'

const onboardingItems = [
  { Icon: PlusIcon, label: 'Add the annotation categories' },
  { Icon: PaintBrushIcon, label: 'Use brush or polygon forms to annotate it' },
  {
    Icon: DocumentArrowDownIcon,
    label: 'Validate the dataset and export it in COCO format',
  },
]

export default onboardingItems
