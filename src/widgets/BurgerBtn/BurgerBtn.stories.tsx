import { type Meta, type StoryObj } from '@storybook/react'
import { BurgerBtn } from './BurgerBtn'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof BurgerBtn> = {
  title: 'widget/BurgerBtn',
  component: BurgerBtn
}

export default meta

type Story = StoryObj<typeof BurgerBtn>

export const BurgerBtnDark: Story = {
  render: (args) => <BurgerBtn {...args}/>
}

export const BurgerBtnLight: Story = {
  render: (args) => <BurgerBtn {...args}/>
}

BurgerBtnDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

BurgerBtnLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
