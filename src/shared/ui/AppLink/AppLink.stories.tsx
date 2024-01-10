import { type Meta, type StoryObj } from '@storybook/react'
import { AppLink } from './AppLink'
import { BrowswerRouterDecorator, ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof AppLink> = {
  title: 'shared/AppLink',
  component: AppLink,
  decorators: [
    BrowswerRouterDecorator
  ],
  args: {
    children: 'Test'
  }
}

export default meta

type Story = StoryObj<typeof AppLink>

export const AppLinkDark: Story = {
  render: (args) => <AppLink {...args}/>,
  decorators: [
    ThemeDecorator(Theme.DARK)
  ]
}

export const AppLinkLight: Story = {
  render: (args) => <AppLink {...args}/>,
  decorators: [
    ThemeDecorator(Theme.LIGHT)
  ]
}
