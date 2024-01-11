import { type Meta, type StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { ThemeDecorator } from 'shared/config/storybook/Decorators/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { BrowswerRouterDecorator } from 'shared/config/storybook/Decorators/BrowserRouterDecorator/BrowserRouterDecorator'

const meta: Meta<typeof Sidebar> = {
  title: 'widget/Sidebar',
  component: Sidebar
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const SidebarDark: Story = {
  render: (args) => <Sidebar {...args}/>
}

SidebarDark.decorators = [
  BrowswerRouterDecorator,
  ThemeDecorator(Theme.DARK)
]
