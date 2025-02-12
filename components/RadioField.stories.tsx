import { UserCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'

import RadioField from '@/components/RadioField'

const values = [
  { value: 'radio_one', children: 'Radio One' },
  { value: 'radio_two', children: 'Radio Two' },
]
const meta = {
  component: RadioField,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Radio group',
    name: 'radio_group',
    defaultValue: 'radio_one',
    values,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Vertical: Story = {
  args: {
    vertical: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Children: Story = {
  args: {
    values: [
      {
        ...values[0],
        label: 'Radio One',
        children: <UserCircleIcon className="size-4" />,
      },
      {
        ...values[1],
        label: 'Radio Two',
        children: <UserGroupIcon className="size-4" />,
      },
    ],
  },
}
