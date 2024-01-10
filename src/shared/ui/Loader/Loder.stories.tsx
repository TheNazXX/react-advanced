import { type Meta, type StoryObj } from '@storybook/react'
import { Loader } from './Loader'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Loader> = {
  title: 'shared/Loader',
  component: Loader
}

export default meta

type Story = StoryObj<typeof Loader>

export const LoaderDark: Story = {
  render: (args) => <Loader {...args}/>
}

export const LoaderLight: Story = {
  render: (args) => <Loader {...args}/>
}

LoaderDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

LoaderLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
