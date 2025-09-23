import type { Meta, StoryObj } from '@storybook/react';
import { CustomInput } from '../components/form/CustomInput';
import { FormControl } from '../components/form/FormControl';
import { iconMap } from '../components/general/CustomIcon';

const meta: Meta<typeof CustomInput> = {
  title: 'Form Controls/CustomInput',
  component: CustomInput,
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
type Story = StoryObj<typeof CustomInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your email...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <FormControl label="Email Address">
      <CustomInput {...args} />
    </FormControl>
  ),
  args: {
    placeholder: 'you@example.com',
  },
};

export const WithError: Story = {
  render: (args) => (
    <FormControl label="Email Address" error="Please enter a valid email.">
      <CustomInput {...args} />
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
      <CustomInput {...args} />
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
      <CustomInput {...args} />
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
      <CustomInput {...args} />
    </FormControl>
  ),
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
  },
};