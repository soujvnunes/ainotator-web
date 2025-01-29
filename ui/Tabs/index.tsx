import { Tab, TabList } from '@headlessui/react'

import tabsStyles from './styles'

interface TabsProps extends React.ComponentPropsWithRef<'button'> {
  value: string[]
}

export default function Tabs({ className, value, ...props }: TabsProps) {
  return (
    <TabList className={tabsStyles.root()}>
      {value.map((tab) => (
        <Tab
          key={tab}
          className={tabsStyles.tab({ className })}
          {...props}>
          {tab}
        </Tab>
      ))}
    </TabList>
  )
}
