import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import FieldRange from './index'

const meta = {
  component: FieldRange,
  tags: ['autodocs'],
  args: {
    label: 'Range',
    value: 24,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FieldRange>

export default meta
type Story = StoryObj<typeof meta>

const MockFieldRange: Story = {
  render: function Render({ value, ...args }) {
    const [newValue, setValue] = useState(value)

    return (
      <FieldRange
        onChange={(event) => setValue(+event.target.value)}
        value={newValue}
        {...args}
      />
    )
  },
}

export const Default: Story = {
  ...MockFieldRange,
}

export const Disabled: Story = {
  ...MockFieldRange,
  args: {
    disabled: true,
  },
}
