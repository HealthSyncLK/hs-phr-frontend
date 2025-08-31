import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuSeparator,
} from '../components/navigation/DropdownMenu';
import { Button } from '../components/general/Button';
import { Icon } from '../components/general/Icon';

const meta: Meta<typeof DropdownMenu> = {
    title: 'Navigation/DropdownMenu',
    component: DropdownMenu,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                    Open Menu
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

export const WithIcons: Story = {
    name: 'With Icons (As seen in Table)',
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="tertiary" size="sm" className='text-text-header'>
                    <Icon name="more-vertical" className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuItem>
                    <Icon name="edit" className="w-4 h-4 mr-2" />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-danger-text focus:bg-danger focus:text-white">
                    <Icon name="trash" className="w-4 h-4 mr-2" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};