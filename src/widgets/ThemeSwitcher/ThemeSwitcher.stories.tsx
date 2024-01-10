import { type Meta, type StoryObj } from '@storybook/react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'widget/ThemeSwitcher',
  component: ThemeSwitcher
}

export default meta

type Story = StoryObj<typeof ThemeSwitcher>

export const ThemeSwitcherDark: Story = {
  render: (args) => <ThemeSwitcher {...args}/>
}

export const ThemeSwitcherLight: Story = {
  render: (args) => <ThemeSwitcher {...args}/>
}

ThemeSwitcherDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

ThemeSwitcherLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
