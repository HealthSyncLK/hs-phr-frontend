import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl, SegmentedControlItem } from '../components/navigation/SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
    title: 'Navigation/SegmentedControl',
    component: SegmentedControl,
    subcomponents: { SegmentedControlItem },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
    name: 'Appointment Filter',
    render: () => {
        const [value, setValue] = useState('upcoming');

        return (
            <SegmentedControl value={value} onValueChange={setValue}>
                <SegmentedControlItem value="all">All</SegmentedControlItem>
                <SegmentedControlItem value="upcoming">Upcoming</SegmentedControlItem>
                <SegmentedControlItem value="today">Today</SegmentedControlItem>
                <SegmentedControlItem value="past">Past</SegmentedControlItem>
            </SegmentedControl>
        );
    },
};

export const ViewSwitcher: Story = {
    name: 'View Switcher',
    render: () => {
        const [value, setValue] = useState('list');

        return (
            <SegmentedControl value={value} onValueChange={setValue}>
                <SegmentedControlItem value="calendar">Calendar View</SegmentedControlItem>
                <SegmentedControlItem value="list">List View</SegmentedControlItem>
            </SegmentedControl>
        );
    },
};