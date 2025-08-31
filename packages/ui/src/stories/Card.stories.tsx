import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/app/Card';
import { Typography } from '../components/general/Typography';
import { Button } from '../components/general/Button';

const meta: Meta<typeof Card> = {
    title: 'App Shell & Overlays/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'radio',
            options: ['default', 'outlined'],
        },
        children: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

const cardContent = (
    <div className="flex flex-col gap-4">
        <Typography variant="h3">Card Title</Typography>
        <Typography variant="body2">
            This is the body of the card. It contains supplementary details and supporting text.
            Responsiveness is handled by the parent container.
        </Typography>
        <Button variant="secondary" size="sm" className="self-start">
            Action
        </Button>
    </div>
);

export const Default: Story = {
    args: {
        variant: 'default',
        children: cardContent,
    },
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        children: cardContent,
    },
};

export const ResponsiveExample: Story = {
    name: 'In a Responsive Grid',
    render: () => (
        <div>
            <Typography variant="h4" className="mb-4">
                Resize your browser to see the cards stack.
            </Typography>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>{cardContent}</Card>
                <Card variant="outlined">{cardContent}</Card>
                <Card>{cardContent}</Card>
            </div>
        </div>
    ),
};