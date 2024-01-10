import { type Meta, type StoryObj } from '@storybook/react'
import { ErrorPage } from './ErrorPage'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof ErrorPage> = {
  title: 'pages/ErrorPage',
  component: ErrorPage
}

export default meta

type Story = StoryObj<typeof ErrorPage>

export const ErrorPageDark: Story = {
  render: (args) => <ErrorPage {...args}/>
}

export const ErrorPageLight: Story = {
  render: (args) => <ErrorPage {...args}/>
}

ErrorPageDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

ErrorPageLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
