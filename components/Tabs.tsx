import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

import tabs from '@/styles/tabs'

interface TabsContentProps {
  label: string
  panel: React.ReactNode
  disabled?: boolean
}
interface TabsProps {
  values: TabsContentProps[]
}

export default function Tabs({ values }: TabsProps) {
  return (
    <TabGroup>
      <TabList className={tabs.root()}>
        {values.map(({ label, ...value }) => (
          <Tab
            key={label}
            className={tabs.tab()}
            {...value}>
            {label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {values.map((value) => (
          <TabPanel key={value.label}>{value.panel}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}
