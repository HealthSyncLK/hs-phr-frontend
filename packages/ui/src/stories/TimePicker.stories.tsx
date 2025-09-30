import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '../components/form/TimePicker';
import { FormControl } from '../components/form/FormControl';

const meta: Meta<typeof TimePicker> = {
    title: 'Form Controls/TimePicker',
    component: TimePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
    name: 'Interactive TimePicker',
    render: () => {
        // Default story
        const [time, setTime] = useState<{ hour: number; minute: number } | null>({
            hour: 9,
            minute: 30,
        });
        return (
            <div className="w-64">
                <FormControl label="Appointment Time">
                    <TimePicker
                        aria-label="Appointment time"
                        value={time}
                        onChange={setTime}
                    />
                </FormControl>
                <div className="mt-2 text-xs text-text-light">
                    {time
                        ? `Selected Time: ${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
                        : 'No time selected'}                </div>
            </div>
        );
    },
};

export const Empty: Story = {
    name: 'Empty State',
    render: () => {
        const [time, setTime] = useState<{ hour: number; minute: number } | null>(null);

        return (
            <div className="w-64">
                <FormControl label="Appointment Time">
                    <TimePicker
                        aria-label="Appointment time"
                        value={time}
                        onChange={setTime}
                    />
                </FormControl>
            </div>
        );
    },
};