import type { Preview } from '@storybook/react'
import { StyleDecorator } from 'shared/config/storybook/styleDecorator/styleDecorator'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    StyleDecorator
  ]
}

export default preview
