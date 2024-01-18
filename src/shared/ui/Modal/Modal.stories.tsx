import { type Meta, type StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { ThemeDecorator } from 'shared/config/storybook/Decorators'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Modal> = {
  title: 'widget/Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: () => {}
  }
}

export default meta

type Story = StoryObj<typeof Modal>

export const ModalDark: Story = {
  render: (args) => <Modal {...args}/>
}

export const ModalLight: Story = {
  render: (args) => <Modal {...args}/>
}

ModalDark.decorators = [
  ThemeDecorator(Theme.DARK)
]

ModalLight.decorators = [
  ThemeDecorator(Theme.LIGHT)
]
