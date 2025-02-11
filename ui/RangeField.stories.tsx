import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import RangeField from '@/ui/RangeField'

const meta = {
  component: RangeField,
  tags: ['autodocs'],
  args: {
    label: 'Range',
    value: 24,
    max: 40,
    min: 8,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RangeField>

export default meta
type Story = StoryObj<typeof meta>

const MockRangeField: Story = {
  render: function Render({ value, ...args }) {
    const [newValue, setValue] = useState(value)

    return (
      <RangeField
        onChange={(event) => setValue(+event.target.value)}
        value={newValue}
        {...args}
      />
    )
  },
}

export const Default: Story = {
  ...MockRangeField,
}

export const Disabled: Story = {
  ...MockRangeField,
  args: {
    disabled: true,
  },
}
