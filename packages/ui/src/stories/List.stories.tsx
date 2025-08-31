import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '../components/general/List';
import { Avatar } from '../components/general/Avatar';
import { Typography } from '../components/general/Typography';
import { Tag } from '../components/general/Tag';
import { Card } from '../components/app/Card';

const meta: Meta<typeof List> = {
    title: 'General/List',
    component: List,
    subcomponents: { ListItem },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
    name: 'Simple List',
    render: () => (
        <Card className="max-w-sm">
            <List>
                <ListItem>
                    <Typography>List Item 1</Typography>
                </ListItem>
                <ListItem>
                    <Typography>List Item 2</Typography>
                </ListItem>
                <ListItem>
                    <Typography>List Item 3</Typography>
                </ListItem>
            </List>
        </Card>
    ),
};

export const WithComplexContent: Story = {
    name: 'Upcoming Appointments List',
    render: () => (
        <Card className="max-w-md">
            <div className="p-4">
                <Typography variant="h3">Upcoming Appointments</Typography>
            </div>
            <List>
                <ListItem className="px-4">
                    <Avatar fallback="EJ" alt="EJ" className="w-11 h-11" />
                    <div className="flex-grow">
                        <Typography variant="body1" className="font-medium">Dr. Emily Johnson</Typography>
                        <div className="flex gap-2 mt-1">
                            <Tag variant="default">09:00 AM</Tag>
                            <Tag variant="default">27/08/2025</Tag>
                        </div>
                    </div>
                </ListItem>
                <ListItem className="px-4">
                    <Avatar fallback="SM" alt='SM' className="w-11 h-11" />
                    <div className="flex-grow">
                        <Typography variant="body1" className="font-medium">Dr. Sara Mitchell</Typography>
                        <div className="flex gap-2 mt-1">
                            <Tag variant="default">11:30 AM</Tag>
                            <Tag variant="default">28/08/2025</Tag>
                        </div>
                    </div>
                </ListItem>
            </List>
        </Card>
    )
}