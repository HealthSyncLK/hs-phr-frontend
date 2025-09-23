import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
// We import `Calendar` but rename it to `CustomDatePicker` for clarity in the story
import { CustomDatePicker } from '../components/form/CustomDatePicker';
import { Card } from '../components/app/Card';

const meta: Meta<typeof CustomDatePicker> = {
    title: 'Form Controls/CustomDatePicker',
    component: CustomDatePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof CustomDatePicker>;

export const Default: Story = {
    name: 'As a Calendar Panel',
    render: () => {
        const [date, setDate] = useState<Date | undefined>(new Date());

        return (
            <Card className="w-auto">
                <CustomDatePicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />
            </Card>
        );
    },
};

export const RangeSelection: Story = {
    name: 'As a Range Selector',
    render: () => {
        const [range, setRange] = useState<DateRange | undefined>();

        return (
            <Card className="w-auto">
                <CustomDatePicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                />
            </Card>
        );
    },
};