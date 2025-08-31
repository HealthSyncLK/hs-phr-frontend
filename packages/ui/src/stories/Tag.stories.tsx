import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../components/general/Tag';

const meta: Meta<typeof Tag> = {
    title: 'General/Tag',
    component: Tag,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'success', 'warning', 'danger'],
        },
        children: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
    args: {
        variant: 'default',
        children: 'Default',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Active',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        children: 'Pending',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        children: 'Inactive',
    },
};

export const AllVariants: Story = {
    name: 'All Variants',
    render: () => (
        <div className="flex items-center gap-4">
            <Tag variant="default">Default</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="danger">Danger</Tag>
        </div>
    ),
};