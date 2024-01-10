import { type Meta, type StoryObj } from '@storybook/react'
import MainPage from './MainPage'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof MainPage> = {
  title: 'pages/MainPage',
  component: MainPage
}

export default meta

type Story = StoryObj<typeof MainPage>

export const MainPageDark: Story = {
  render: (args) => <MainPage {...args}/>
}

export const MainPageLight: Story = {
  render: (args) => <MainPage {...args}/>
}

MainPageDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

MainPageLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
