import { type Meta, type StoryObj } from '@storybook/react'
import { LoginForm } from './LoginForm'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof LoginForm> = {
  title: 'features/LoginForm',
  component: LoginForm
}

export default meta

type Story = StoryObj<typeof LoginForm>

export const LoginFormDark: Story = {
  render: (args) => <LoginForm {...args}/>
}

export const LoginFormLight: Story = {
  render: (args) => <LoginForm {...args}/>
}

LoginFormDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

LoginFormLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
