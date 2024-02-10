import type { Preview } from '@storybook/react'
import { StyleDecorator } from 'shared/config/storybook/Decorators'
import { TranslationDecorator } from 'shared/config/storybook/Decorators/TranslationDecorator/TranslationDecorator'

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
    StyleDecorator, 
    TranslationDecorator
  ]
}

export default preview
