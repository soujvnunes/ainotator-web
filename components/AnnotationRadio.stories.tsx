import { RadioGroup } from '@headlessui/react'
import type { Meta, StoryObj } from '@storybook/react'

import AnnotationRadio from '@/components/AnnotationRadio'

const meta = {
  component: AnnotationRadio,
  tags: ['autodocs'],
  args: {
    type: 'brush',
    isCrowd: 'yes',
    value: 'cat',
    color: 'red',
    children: 'Cat',
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <RadioGroup>
        <Story />
      </RadioGroup>
    ),
  ],
} satisfies Meta<typeof AnnotationRadio>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  decorators: [
    (Story) => (
      <RadioGroup value="cat">
        <Story />
      </RadioGroup>
    ),
  ],
}

export const Disabled: Story = {
  decorators: [
    (Story) => (
      <RadioGroup disabled>
        <Story />
      </RadioGroup>
    ),
  ],
}

export const Compact: Story = {
  args: {
    compact: true,
  },
}

export const CompactChecked: Story = {
  ...Compact,
  ...Checked,
}

export const CompactDisabled: Story = {
  ...Compact,
  ...Disabled,
}
