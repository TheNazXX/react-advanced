import { type Meta, type StoryObj } from '@storybook/react'
import { Button, TypeButton } from './Button'

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
