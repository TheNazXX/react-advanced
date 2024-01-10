import { type Meta, type StoryObj } from '@storybook/react'
import { LangSwitcher } from './LangSwitcher'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof LangSwitcher> = {
  title: 'widget/LangSwitcher',
  component: LangSwitcher
}

export default meta

type Story = StoryObj<typeof LangSwitcher>

export const LangSwitcherDark: Story = {
  render: (args) => <LangSwitcher {...args}/>
}

export const LangSwitcherLight: Story = {
  render: (args) => <LangSwitcher {...args}/>
}

LangSwitcherDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

LangSwitcherLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
