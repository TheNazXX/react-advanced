import { type Meta, type StoryObj } from '@storybook/react'
import { CloseBtn } from './CloseBtn'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof CloseBtn> = {
  title: 'widget/CloseBtn',
  component: CloseBtn
}

export default meta

type Story = StoryObj<typeof CloseBtn>

export const CloseBtnDark: Story = {
  render: (args) => <CloseBtn {...args}/>
}

export const CloseBtnLight: Story = {
  render: (args) => <CloseBtn {...args}/>
}

CloseBtnDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

CloseBtnLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
