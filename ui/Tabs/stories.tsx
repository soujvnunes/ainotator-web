import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './index'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  args: {
    values: [
      {
        label: 'Tab One',
        panel: <div>Content One</div>,
      },
      {
        label: 'Tab Two',
        panel: <div>Content Two</div>,
      },
    ],
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
