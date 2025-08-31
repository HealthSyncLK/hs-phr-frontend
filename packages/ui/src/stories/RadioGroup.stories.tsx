import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from '../components/form/RadioGroup';
import { FormControl } from '../components/form/FormControl';

const meta: Meta<typeof RadioGroup> = {
    title: 'Form Controls/RadioGroup',
    component: RadioGroup,
    subcomponents: { Radio },
    tags: ['autodocs'],
    argTypes: {
        orientation: { // New control for orientation
            control: 'radio',
            options: ['vertical', 'horizontal'],
        },
    },
    // We need a wrapper to manage state for the interactive story
    render: (args) => {
        const [value, setValue] = useState('male');
        return (
            <FormControl label="Select an Option">
                <RadioGroup
                    {...args}
                    name="storybook-group"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                >
                    <Radio label="Male" value="male" />
                    <Radio label="Female" value="female" />
                    <Radio label="Other" value="other" disabled />
                </RadioGroup>
            </FormControl>
        );
    },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
    name: 'Vertical (Default)',
    args: {
        orientation: 'vertical',
    },
};

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
    },
};