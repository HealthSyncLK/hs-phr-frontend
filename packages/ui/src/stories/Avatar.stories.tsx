import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components/general/Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'General/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        src: {
            control: 'text',
            description: 'Image URL for the avatar.',
        },
        alt: {
            control: 'text',
            description: 'Alt text for the image.',
        },
        fallback: {
            control: 'text',
            description: 'Fallback text (initials) to display.',
        },
        className: {
            control: 'text',
            description: 'Additional classes for sizing (e.g., "w-16 h-16").',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    name: 'With Image',
    args: {
        src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80',
        alt: 'John Wink',
        fallback: 'JW',
    },
};

export const Fallback: Story = {
    name: 'Fallback (No Image Source)',
    args: {
        src: '', // No src provided
        alt: 'John Wink',
        fallback: 'JW',
    },
};

export const BrokenImage: Story = {
    name: 'Fallback (Broken Image)',
    args: {
        src: 'https://example.com/broken-image.jpg', // Invalid URL
        alt: 'John Wink',
        fallback: 'JW',
    },
};

export const DifferentSizes: Story = {
    name: 'Different Sizes',
    render: () => (
        <div className="flex items-center gap-4">
            <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"
                alt="John Wink"
                fallback="JW"
                className="w-10 h-10"
            />
            <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"
                alt="John Wink"
                fallback="JW"
                className="w-16 h-16 text-xl" // Font size can be adjusted too
            />
            <Avatar
                src=""
                alt="Jane Doe"
                fallback="JD"
                className="w-20 h-20 text-2xl"
            />
        </div>
    ),
};