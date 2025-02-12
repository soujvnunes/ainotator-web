import { UserGroupIcon, UserIcon } from '@heroicons/react/24/solid'

import annotatorCrowds from '@/consts/annotatorCrowds'

export default annotatorCrowds.map((value) => {
  const Icon = value === 'yes' ? UserGroupIcon : UserIcon

  return { children: <Icon className="size-4" />, value }
})
