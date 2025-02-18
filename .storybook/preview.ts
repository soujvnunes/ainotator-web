import type { Preview } from '@storybook/react'

import '@/styles/tailwind.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [{ name: 'default', value: '#000000' }],
      default: 'default',
    },
  },
}

export default preview
