import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from '../components/form/PhoneInput';
import { FormControl } from '../components/form/FormControl';

const meta: Meta<typeof PhoneInput> = {
    title: 'Form Controls/PhoneInput',
    component: PhoneInput,
    tags: ['autodocs'],
    argTypes: {
        countryCode: {
            control: 'text',
            description: 'The currently selected country code.',
        },
        onCountryCodeChange: {
            action: 'countryCodeChanged',
            description: 'Callback for when a new country code is selected.',
        },
        value: {
            control: 'text',
            description: 'The phone number value.',
        },
        error: {
            control: 'boolean',
            description: 'Toggles the error state styling.',
        },
        disabled: {
            control: 'boolean',
        },
    },
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
    name: 'Interactive Phone Input',
    render: () => {
        const [phone, setPhone] = useState('');
        const [countryCode, setCountryCode] = useState('+94');

        return (
            <div className="w-80">
                <FormControl label="Mobile Number">
                    <PhoneInput
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        countryCode={countryCode}
                        onCountryCodeChange={setCountryCode}
                        placeholder="Enter mobile number"
                    />
                </FormControl>
                <div className="mt-2 text-xs text-text-light">
                    Current Value: {countryCode} {phone}
                </div>
            </div>
        );
    },
};

export const WithError: Story = {
    name: 'Error State',
    render: () => {
        const [phone, setPhone] = useState('123');
        const [countryCode, setCountryCode] = useState('+94');

        return (
            <div className="w-80">
                <FormControl label="Mobile Number" error="Please enter a valid number.">
                    <PhoneInput
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        countryCode={countryCode}
                        onCountryCodeChange={setCountryCode}
                        placeholder="Enter mobile number"
                        error={true}
                    />
                </FormControl>
            </div>
        );
    },
};

export const Disabled: Story = {
    name: 'Disabled State',
    render: () => {
        return (
            <div className="w-80">
                <FormControl label="Mobile Number">
                    <PhoneInput
                        value="771234567"
                        countryCode="+94"
                        onCountryCodeChange={() => { }}
                        disabled
                    />
                </FormControl>
            </div>
        );
    },
};