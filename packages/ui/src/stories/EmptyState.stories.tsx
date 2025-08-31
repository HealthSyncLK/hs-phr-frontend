import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/general/Button';
import { Icon } from '../components/general/Icon';
import { EmptyState } from '../components/composites/EmptyState';

const meta: Meta<typeof EmptyState> = {
    title: 'App-Specific Composites/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    name: 'Immunizations Empty State',
    args: {
        illustrationSrc: '/src/stories/assets/no-records-illustration.png', // Use the imported image
        title: "No records yet",
        description: "Start by adding your first entry to keep everything in one place.",
        action: (
            <Button>
                <Icon name="plus" className="w-5 h-5 mr-2" />
                Add Immunizations
            </Button>
        ),
    }
};