import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';


const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {

    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    backgroundColor: {control: 'color'}
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;


