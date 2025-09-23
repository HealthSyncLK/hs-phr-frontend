import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/general/Badge';
import { CustomIcon } from '../components/general/CustomIcon';

const meta: Meta<typeof Badge> = {
    title: 'General/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'radio',
            options: ['dot', 'count'],
        },
        count: {
            control: { type: 'number', min: 0, max: 99 },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Dot: Story = {
    args: {
        variant: 'dot',
    },
};

export const Count: Story = {
    args: {
        variant: 'count',
        count: 7,
    },
};

export const OnIcon: Story = {
    name: 'Positioned on an CustomIcon',
    render: () => (
        // STYLE CHANGE: Changed from `div` to `inline-flex` to wrap the container around the icon.
        <div className="relative inline-flex p-2">
            <CustomIcon name="bell" className="w-8 h-8 text-text-header" />
            {/* STYLE CHANGE: Adjusted position for better overlap */}
            <div className="absolute top-0 right-0">
                <Badge variant="count" count={3} />
            </div>
        </div>
    ),
};