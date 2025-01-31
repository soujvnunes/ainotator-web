import { UserGroupIcon, UserIcon } from '@heroicons/react/24/solid'

const annotatorCrowds = [
  {
    children: <UserGroupIcon className="size-4" />,
    value: 'yes',
  },
  {
    children: <UserIcon className="size-4" />,
    value: 'no',
  },
]

export type AnnotatorCrowds = (typeof annotatorCrowds)[number]['value']

export default annotatorCrowds
