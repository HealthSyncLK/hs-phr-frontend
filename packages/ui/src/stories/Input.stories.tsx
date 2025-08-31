import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/form/Input';
import { FormControl } from '../components/form/FormControl';
import { iconMap } from '../components/general/Icon';

const meta: Meta<typeof Input> = {
  title: 'Form Controls/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    leftIcon: {
      control: 'select',
      options: [undefined, ...Object.keys(iconMap)],
    },
    rightIcon: {
      control: 'select',
      options: [undefined, ...Object.keys(iconMap)],
    },
  },
  // Decorator to wrap every story in a FormControl for consistent spacing
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your email...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <FormControl label="Email Address">
      <Input {...args} />
    </FormControl>
  ),
  args: {
    placeholder: 'you@example.com',
  },
};

export const WithError: Story = {
  render: (args) => (
    <FormControl label="Email Address" error="Please enter a valid email.">
      <Input {...args} />
    </FormControl>
  ),
  args: {
    placeholder: 'you@example.com',
    hasError: true,
    defaultValue: 'invalid-email',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <FormControl label="Email Address">
      <Input {...args} />
    </FormControl>
  ),
  args: {
    placeholder: 'you@example.com',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  render: (args) => (
    <FormControl label="Search">
      <Input {...args} />
    </FormControl>
  ),
  args: {
    placeholder: 'Search for records...',
    leftIcon: 'search',
  },
};

export const Password: Story = {
  render: (args) => (
    <FormControl label="Password">
      <Input {...args} />
    </FormControl>
  ),
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
  },
};