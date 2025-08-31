import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/form/Switch';

const meta: Meta<typeof Switch> = {
    title: 'Form Controls/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Optional label for the switch.',
        },
        checked: {
            control: 'boolean',
            description: 'The controlled state of the switch.',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the switch is disabled.',
        },
        onCheckedChange: {
            action: 'checked changed',
            description: 'Callback function when the state changes.',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// We create a wrapper to manage the state for the interactive story.
const InteractiveSwitch = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Switch
            label="Enable Notifications"
            checked={isChecked}
            onCheckedChange={setIsChecked}
        />
    );
};

export const Default: Story = {
    render: () => <InteractiveSwitch />,
};

export const On: Story = {
    args: {
        label: 'On State',
        checked: true,
    },
};

export const Off: Story = {
    args: {
        label: 'Off State',
        checked: false,
    },
};

export const DisabledOn: Story = {
    name: 'Disabled (On)',
    args: {
        label: 'Cannot Disable',
        checked: true,
        disabled: true,
    },
};

export const DisabledOff: Story = {
    name: 'Disabled (Off)',
    args: {
        label: 'Cannot Enable',
        checked: false,
        disabled: true,
    },
};