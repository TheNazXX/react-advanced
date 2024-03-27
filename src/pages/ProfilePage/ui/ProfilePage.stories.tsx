import { type Meta, type StoryObj } from '@storybook/react'

import ProfilePage from './ProfilePage'
import { StoreDecorator } from 'shared/config/storybook/Decorators/StoreDecorator/StoreDecorator'
import { BrowswerRouterDecorator, ThemeDecorator } from 'shared/config/storybook/Decorators'
import { formStructure } from 'entities/Profile/model/types/profile'
import avatar from 'shared/assets/tests/images/avatar.jpg'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof ProfilePage> = {
  title: 'pages/ProfilePage',
  component: ProfilePage
}

export default meta

type Story = StoryObj<typeof ProfilePage>

export const Primary: Story = {
  render: (args) => <ProfilePage {...args}/>
}

Primary.args = {

}

Primary.decorators = [
  StoreDecorator({
    profile: {
      form: {
        [formStructure.FIRSTNAME]: 'Nazar',
        [formStructure.LASTNAME]: 'Shevchuk',
        [formStructure.ROLE]: 'admin',
        [formStructure.AVATAR]: avatar
      },
      readonly: true
    }
  }),
  BrowswerRouterDecorator,
  ThemeDecorator(Theme.DARK)
]
