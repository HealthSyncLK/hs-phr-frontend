import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Sidebar,
    SidebarHeader,
    SidebarNav,
    SidebarItem,
    SidebarCollapse,
    SidebarSubItem,
} from '../components/navigation/Sidebar';
import { Logo } from '../components/general/Logo';

const meta: Meta<typeof Sidebar> = {
    title: 'Navigation/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    render: () => (
        // FIX: Added a gray background and min-height to the container
        <div className="flex min-h-screen w-full bg-neutral-50 p-5">
            <Sidebar>
                <SidebarHeader>
                    <Logo />
                </SidebarHeader>
                <SidebarNav>
                    <SidebarItem href="#" icon="home">
                        Home
                    </SidebarItem>

                    <SidebarCollapse icon="document" title="Records" isActive>
                        <SidebarSubItem href="#">Health Records</SidebarSubItem>
                        <SidebarSubItem href="#">Appointments</SidebarSubItem>
                        <SidebarSubItem href="#">Insurance</SidebarSubItem>
                        <SidebarSubItem href="#" isActive>Immunization</SidebarSubItem>
                        <SidebarSubItem href="#">Procedures</SidebarSubItem>
                    </SidebarCollapse>

                    <SidebarItem href="#" icon="heart-rate">
                        Medication
                    </SidebarItem>
                    <SidebarItem href="#" icon="users">
                        Family
                    </SidebarItem>
                    <SidebarItem href="#" icon="shopping-cart">
                        Shop
                    </SidebarItem>
                    <SidebarItem href="#" icon="message-circle">
                        Chat Now
                    </SidebarItem>
                    <SidebarItem href="#" icon="user">
                        Profile
                    </SidebarItem>
                    <SidebarItem href="#" icon="settings">
                        Settings
                    </SidebarItem>
                    <SidebarItem href="#" icon="bell">
                        Notification
                    </SidebarItem>
                </SidebarNav>
            </Sidebar>
            <main className="p-6 flex-grow">
                {/* Your page content would go here */}
            </main>
        </div>
    ),
};