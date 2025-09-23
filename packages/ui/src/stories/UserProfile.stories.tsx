import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '../components/navigation/DropdownMenu';
import { CustomIcon } from '../components/general/CustomIcon';
import { UserProfile } from '../components/composites/UserProfile';

const meta: Meta<typeof UserProfile> = {
    title: 'App-Specific Composites/UserProfile',
    component: UserProfile,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
    name: 'Default User Profile',
    render: () => (
        <UserProfile
            userName="John Wink"
            userFallback="JW"
            userImageSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"
        >
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                    <CustomIcon name="user" className="w-4 h-4 mr-2" />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CustomIcon name="settings" className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-danger-text focus:text-white focus:bg-danger">
                    <CustomIcon name="log-out" className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </UserProfile>
    ),
};