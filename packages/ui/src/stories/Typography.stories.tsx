import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../components/general/Typography';

const meta: Meta<typeof Typography> = {
  title: 'General/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body1', 'body2', 'caption'],
      description: 'The stylistic variant of the text.',
    },
    as: {
      control: 'text',
      description: 'Override the default HTML element (e.g., "span", "div").',
    },
    children: {
      control: 'text',
      description: 'The content of the typography component.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1 - 30px Semibold',
    className: ""
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2 - 20px Medium',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3 - 18px Semibold',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4 - 16px Semibold',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children:
      'Body 1 (Primary) - 16px Regular. This is the standard paragraph text for most content in the application, ensuring readability and a clean look.',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children:
      'Body 2 (Secondary) - 14px Regular. This is used for supplementary information, helper text, and less emphasized content.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption - 12px Regular. Ideal for timestamps or minor details.',
  },
};

export const CustomElement: Story = {
  name: 'As a Custom Element',
  args: {
    variant: 'h3',
    as: 'div',
    children: 'This is an H3 style rendered as a <div> element.',
  },
};