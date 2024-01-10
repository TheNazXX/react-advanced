import { type Meta, type StoryObj } from '@storybook/react'
import { PageNotFound } from './NotFoundPage'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof PageNotFound> = {
  title: 'pages/PageNotFound',
  component: PageNotFound
}

export default meta

type Story = StoryObj<typeof PageNotFound>

export const PageNotFoundDark: Story = {
  render: (args) => <PageNotFound {...args}/>
}

export const PageNotFoundLight: Story = {
  render: (args) => <PageNotFound {...args}/>
}

PageNotFoundDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

PageNotFoundLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
