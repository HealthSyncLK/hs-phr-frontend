import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../components/data/Calendar';

const meta: Meta<typeof Calendar> = {
    title: 'Data Display/Appointment Calendar',
    component: Calendar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
    name: 'Full Page Calendar View',
    // The story is now just one line!
    render: () => <Calendar />,
};