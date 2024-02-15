import { type Meta, type StoryObj } from '@storybook/react'

import LoginForm from './LoginForm'
import { StoreDecorator } from 'shared/config/storybook/Decorators/StoreDecorator/StoreDecorator'

const meta: Meta<typeof LoginForm> = {
  title: 'features/LoginForm',
  component: LoginForm
}

export default meta

type Story = StoryObj<typeof LoginForm>

export const Template: Story = {
  render: (args) => <LoginForm {...args}/>
}

Template.decorators = [
  StoreDecorator({
    loginForm: { login: '123', password: 'abs' }
  })
]
