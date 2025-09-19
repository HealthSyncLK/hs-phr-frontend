import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/general/Logo';

const meta: Meta<typeof Logo> = {
    title: 'General/Logo',
    component: Logo,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
    render: () => (
        <div className="p-4 bg-neutral-100 rounded-md">
            <Logo src="/src/stories/assets/logo.png"/>
        </div>
    ),
};