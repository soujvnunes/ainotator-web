import { UserGroupIcon, UserIcon } from '@heroicons/react/24/solid'

import annotatorCrowds, { type AnnotatorCrowds } from '@/lib/annotatorCrowds'

export default annotatorCrowds.reduce(
  (fields, value) => {
    const children =
      value === 'yes' ? (
        <UserGroupIcon className="size-4" />
      ) : (
        <UserIcon className="size-4" />
      )

    return [...fields, { children, value }]
  },
  [] as { children: React.JSX.Element; value: AnnotatorCrowds }[],
)
