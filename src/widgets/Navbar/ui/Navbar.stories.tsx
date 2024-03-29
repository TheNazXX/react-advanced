import { type Meta, type StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'
import { ThemeDecorator } from 'shared/config/storybook/Decorators/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Navbar> = {
  title: 'widget/Navbar',
  component: Navbar
}

export default meta

type Story = StoryObj<typeof Navbar>

export const NavbarDark: Story = {
  render: (args) => <Navbar {...args}/>
}

NavbarDark.decorators = [
  ThemeDecorator(Theme.DARK)
]
