import type { Meta, StoryObj } from '@storybook/react';
import { CustomIcon } from '../components/general/CustomIcon';
import { iconMap } from '../components/general/CustomIcon'; // Assuming you export iconMap for this story

const meta: Meta<typeof CustomIcon> = {
    title: 'General/CustomIcon',
    component: CustomIcon,
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'select',
            options: Object.keys(iconMap),
            description: 'The name of the icon to display.',
        },
        className: {
            control: 'text',
            description: 'Tailwind classes for size and color (e.g., "w-8 h-8 text-primary").',
        },
    },
};

export default meta;
type Story = StoryObj<typeof CustomIcon>;

export const Default: Story = {
    args: {
        name: 'bell',
        className: 'w-10 h-10 text-primary',
    },
};

export const AllIcons: Story = {
    args: {
        className: " text-primary",
        name: "plus"
    },

    render: () => (
        <div className="flex flex-wrap gap-4 text-text-header">
            {Object.keys(iconMap).map((name) => (
                <div
                    key={name}
                    className="text-primary flex flex-col items-center justify-center p-4 border rounded-md w-28 border-neutral-gray-100"
                >
                    <CustomIcon name={name as keyof typeof iconMap} className="w-8 h-8 mb-2" />
                    <span className="text-xs">{name}</span>
                </div>
            ))}
        </div>
    )
};