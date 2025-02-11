import type { Meta, StoryObj } from '@storybook/react'

import TextField from '@/ui/TextField'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Field text',
    placeholder: 'Placeholder',
    required: false,
    disabled: false,
    invalid: {
      when: false,
      message: 'Invalid message',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Required: Story = {
  args: {
    required: true,
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
export const Invalid: Story = {
  args: {
    defaultValue: '3rr0r',
    invalid: {
      when: true,
      message: 'Invalid value',
    },
  },
}
