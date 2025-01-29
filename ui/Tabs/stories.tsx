import { TabGroup } from '@headlessui/react'
import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './index'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  args: {
    value: ['Tab One', 'Tab Two'],
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <TabGroup>
        <Story />
      </TabGroup>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
