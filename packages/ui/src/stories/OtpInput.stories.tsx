import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OtpInput } from '../components/form/OtpInput';
import { FormControl } from '../components/form/FormControl';

const meta: Meta<typeof OtpInput> = {
    title: 'Form Controls/OtpInput',
    component: OtpInput,
    tags: ['autodocs'],
    argTypes: {
        numInputs: {
            control: { type: 'number', min: 4, max: 8, step: 1 },
        },
        hasError: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
    name: 'Interactive OTP CustomInput',
    render: (args) => {
        const [otp, setOtp] = useState('');
        return (
            <div className="max-w-md">
                <FormControl label="Verification Code">
                    <OtpInput {...args} value={otp} onChange={setOtp} />
                </FormControl>
            </div>
        );
    },
    args: {
        numInputs: 6,
        hasError: false,
    },
};

export const WithError: Story = {
    name: 'Error State',
    render: (args) => {
        const [otp, setOtp] = useState('123'); // Pre-fill to show error state
        return (
            <div className="max-w-md">
                <FormControl label="Verification Code" error="The code you entered is incorrect.">
                    <OtpInput {...args} value={otp} onChange={setOtp} />
                </FormControl>
            </div>
        );
    },
    args: {
        numInputs: 6,
        hasError: true,
    },
};