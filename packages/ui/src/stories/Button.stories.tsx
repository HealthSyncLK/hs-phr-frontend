import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/general/Button';
import { iconMap } from '../components/general/Icon';

const meta: Meta<typeof Button> = {
  title: 'General/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
    },
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    leftIcon: {
      control: 'select',
      options: [undefined, ...Object.keys(iconMap)],
    },
    rightIcon: {
      control: 'select',
      options: [undefined, ...Object.keys(iconMap)],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'xs',
    children: 'Ghost Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    leftIcon: 'plus',
    children: 'Add Item',
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'secondary',
    rightIcon: 'bell',
    children: 'Notifications',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Submitting',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};