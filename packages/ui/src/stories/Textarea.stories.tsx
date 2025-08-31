import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/form/Textarea';
import { FormControl } from '../components/form/FormControl';

const meta: Meta<typeof Textarea> = {
    title: 'Form Controls/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {
        placeholder: { control: 'text' },
        disabled: { control: 'boolean' },
        hasError: { control: 'boolean' },
        rows: {
            control: { type: 'number', min: 2, max: 10 },
        },
    },
    decorators: [
        (Story) => (
            <div className="w-full max-w-sm">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {
        placeholder: 'Enter your comments here...',
    },
};

export const WithLabel: Story = {
    render: (args) => (
        <FormControl label="Consultation Notes">
            <Textarea {...args} />
        </FormControl>
    ),
    args: {
        placeholder: 'Enter notes about the consultation...',
    },
};

export const WithError: Story = {
    render: (args) => (
        <FormControl label="Your Message" error="This field cannot be empty.">
            <Textarea {...args} />
        </FormControl>
    ),
    args: {
        hasError: true,
    },
};

export const Disabled: Story = {
    render: (args) => (
        <FormControl label="Additional Information">
            <Textarea {...args} />
        </FormControl>
    ),
    args: {
        placeholder: 'You cannot edit this field.',
        disabled: true,
    },
};