import type { Meta, StoryObj } from '@storybook/react'

import Button from '@/components/Button'

const meta = {
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'text',
    disabled: false,
    fullWidth: false,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const FilledDisabled: Story = {
  args: {
    ...Filled.args,
    ...Disabled.args,
  },
}
