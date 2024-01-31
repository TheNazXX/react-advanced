import { type Meta, type StoryObj } from '@storybook/react'
import AboutPage from './RepeatPage'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof AboutPage> = {
  title: 'pages/RepeatPage',
  component: AboutPage
}

export default meta

type Story = StoryObj<typeof AboutPage>

export const AboutPageDark: Story = {
  render: (args) => <AboutPage {...args}/>
}

export const AboutPageLight: Story = {
  render: (args) => <AboutPage {...args}/>
}

AboutPageDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

AboutPageLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
