import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
// We import `Calendar` but rename it to `DatePicker` for clarity in the story
import { DatePicker } from '../components/form/DatePicker';
import { Card } from '../components/app/Card';

const meta: Meta<typeof DatePicker> = {
    title: 'Form Controls/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    name: 'As a Calendar Panel',
    render: () => {
        const [date, setDate] = useState<Date | undefined>(new Date());

        return (
            <Card className="w-auto">
                <DatePicker
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
                <DatePicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                />
            </Card>
        );
    },
};