import { type Meta, type StoryObj } from '@storybook/react'
import { Input } from './Input'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Input> = {
  title: 'widget/Input',
  component: Input
}

export default meta

type Story = StoryObj<typeof Input>

export const InputDark: Story = {
  render: (args) => <Input {...args}/>
}

export const InputLight: Story = {
  render: (args) => <Input {...args}/>
}

InputDark.args = {
  placeholder: 'Hello storybook!'
}

InputLight.args = {
  placeholder: 'Hello storybook!'
}

InputDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

InputLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
