import type { Preview } from '@storybook/react'
import '../ui/tailwind.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [{ name: 'default', value: '#171717' }],
      default: 'default',
    },
  },
}

export default preview
