import { PlusIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'

import IconButton from '@/components/IconButton'

// TODO: remove it when heroicon package provide a displayName for their icons
PlusIcon.displayName = 'PlusIcon'

const meta = {
  component: IconButton,
  tags: ['autodocs'],
  args: {
    size: 'md',
    children: <PlusIcon className="size-6" />,
    'aria-label': 'Add button',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof IconButton>

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
    ...Disabled.args,
    ...Filled.args,
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const LargeFilled: Story = {
  args: {
    ...Filled.args,
    ...Large.args,
  },
}

export const LargeDisabled: Story = {
  args: {
    ...Large.args,
    ...Disabled.args,
  },
}

export const LargeFilledDisabled: Story = {
  args: {
    ...Large.args,
    ...Disabled.args,
    ...Filled.args,
  },
}
