import { XMarkIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'

import IconButton from '../IconButton'
import OriginalDialog, { type DialogProps } from './Dialog'
import dialog from './Dialog.styles'

// TODO: remove this workaround when Headless make a way to render a element inside Stories available
function Dialog(props: React.PropsWithChildren<DialogProps>) {
  return (
    <div
      role="dialog"
      aria-labelledby="title"
      aria-describedby="description"
      className={dialog.root()}>
      <header className={dialog.header.root}>
        <h2
          id="title"
          className={dialog.header.title.root}>
          {props.title}
          <IconButton
            aria-label={`Close ${props.title} dialog`}
            className={dialog.header.title.close.root}>
            <XMarkIcon className={dialog.header.title.close.icon} />
          </IconButton>
        </h2>
        <p id="description">{props.description}</p>
      </header>
      {props.children}
    </div>
  )
}

const meta = {
  component: Dialog,
  tags: ['autodocs'],
  args: {
    title: 'Dialog',
    description: 'Description',
    children: (
      <section className="p-4">
        <h2 className="mb-2 text-lg">Content</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
    ),
    renderController: (open) => (
      <button
        type="button"
        onClick={open}>
        Open dialog
      </button>
    ),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OriginalDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
