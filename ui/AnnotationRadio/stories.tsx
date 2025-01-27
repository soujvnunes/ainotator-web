import { RadioGroup } from '@headlessui/react'
import type { Meta, StoryObj } from '@storybook/react'

import AnnotationButton from './index'

const meta = {
  component: AnnotationButton,
  tags: ['autodocs'],
  args: {
    type: 'brush',
    isCrowd: 'yes',
    value: 'Radio',
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
} satisfies Meta<typeof AnnotationButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  decorators: [
    (Story) => (
      <RadioGroup value="Radio">
        <Story />
      </RadioGroup>
    ),
  ],
}
