import { type Meta, type StoryObj } from "@storybook/react";

import { Profile } from "./Profile";
import { StoreDecorator } from "shared/config/storybook/Decorators/StoreDecorator/StoreDecorator";
import { formStructure } from "../model/types/profile";
import {
  BrowswerRouterDecorator,
  ThemeDecorator,
} from "shared/config/storybook/Decorators";
import avatar from "shared/assets/tests/images/avatar.jpg";

import "app/styles/index.scss";
import { Theme } from "app/providers/ThemeProvider";

const meta: Meta<typeof Profile> = {
  title: "entities/Profile",
  component: Profile,
};

export default meta;

type Story = StoryObj<typeof Profile>;

export const Primary: Story = {
  render: (args) => <Profile {...args} />,
};

export const Loading: Story = {
  render: (args) => <Profile {...args} />,
};

Primary.args = {
  data: {
    [formStructure.ID]: "1",
    [formStructure.FIRSTNAME]: "Nazar",
    [formStructure.LASTNAME]: "Shevchuk",
    [formStructure.ROLE]: "admin",
    [formStructure.AVATAR]: avatar,
  },
};

Loading.args = {
  isLoading: true,
};

Primary.decorators = [StoreDecorator({}), BrowswerRouterDecorator];

Loading.decorators = [
  StoreDecorator({}),
  BrowswerRouterDecorator,
  ThemeDecorator(Theme.LIGHT),
];
