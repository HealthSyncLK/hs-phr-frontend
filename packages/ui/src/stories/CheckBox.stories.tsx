import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/form/CheckBox';

const meta: Meta<typeof Checkbox> = {
    title: 'Form Controls/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'The label for the checkbox.',
        },
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked.',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled.',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: 'Accept terms and conditions',
        checked: false,
        disabled: false,
    },
};

export const Checked: Story = {
    args: {
        label: 'Accept terms and conditions',
        checked: true,
        disabled: false,
    },
};

export const DisabledUnchecked: Story = {
    name: 'Disabled (Unchecked)',
    args: {
        label: 'Accept terms and conditions',
        checked: false,
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    name: 'Disabled (Checked)',
    args: {
        label: 'Accept terms and conditions',
        checked: true,
        disabled: true,
    },
};