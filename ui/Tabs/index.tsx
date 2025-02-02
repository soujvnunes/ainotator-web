import { Tab, TabList, TabListProps, type TabProps } from '@headlessui/react'

import tabsStyles from './styles'

interface TabsProps extends TabListProps {
  value: (string | TabProps)[]
}

export default function Tabs({ className, value }: TabsProps) {
  return (
    <TabList className={tabsStyles.root({ className })}>
      {value.map((tab) => {
        if (typeof tab === 'string') {
          return (
            <Tab
              key={tab}
              className={tabsStyles.tab()}>
              {tab}
            </Tab>
          )
        }

        return (
          <Tab
            key={tab.children?.toString()}
            {...tab}
            className={tabsStyles.tab({ className: tab.className })}
          />
        )
      })}
    </TabList>
  )
}
