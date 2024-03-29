import { type Meta, type StoryObj } from '@storybook/react'
import { Button, TypeButton } from './Button'
import { ThemeDecorator } from 'shared/config/storybook/Decorators/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: (args) => <Button {...args}/>
}

Primary.args = {
  children: 'Text',
  typeBtn: TypeButton.PRIMARY
}

Primary.decorators = [
  ThemeDecorator(Theme.DARK)
]

export const Outline: Story = {
  render: (args) => <Button {...args}/>
}

Outline.args = {
  children: 'Text',
  typeBtn: TypeButton.OUTLINE
}

Outline.decorators = [
  ThemeDecorator(Theme.LIGHT)
]

export const Disabled: Story = {
  render: (args) => <Button {...args}/>
}

Disabled.args = {
  children: 'Text',
  typeBtn: TypeButton.PRIMARY,
  disabled: true
}

Disabled.decorators = [
  ThemeDecorator(Theme.DARK)
]
