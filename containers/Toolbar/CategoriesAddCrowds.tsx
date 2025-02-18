import { UserGroupIcon, UserIcon } from '@heroicons/react/24/solid'

import annotatorCrowds from '@/consts/annotatorCrowds'

import textField from '@/styles/textField'

import RadioField from '@/components/RadioField'

export default function CategoriesAddCrowds() {
  return (
    <div>
      <p
        aria-hidden="true"
        className={textField.label.root({
          className: 'cursor-default',
        })}>
        Is crowd?
      </p>
      <RadioField
        aria-label="Is crowd?"
        className="mt-2 flex"
        name="isCrowd"
        defaultValue={categoriesAddCrowds[0].value}
        values={categoriesAddCrowds}
      />
    </div>
  )
}

const categoriesAddCrowds = annotatorCrowds.map((value) => {
  const Icon = value === 'yes' ? UserGroupIcon : UserIcon

  return { children: <Icon className="size-4" />, value }
})
