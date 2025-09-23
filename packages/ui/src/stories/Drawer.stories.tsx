import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
} from '../components/app/Drawer';
import { Button } from '../components/general/Button';
import { CustomInput } from '../components/form/CustomInput';
import { FormControl } from '../components/form/FormControl';

const meta: Meta<typeof Drawer> = {
    title: 'App Shell & Overlays/Drawer',
    component: Drawer,
    subcomponents: { DrawerContent, DrawerHeader, DrawerBody, DrawerFooter },
    tags: ['autodocs'],
};

export default meta;

// A wrapper is needed to manage state for the interactive story
const InteractiveDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <DrawerContent>
                    <DrawerHeader>Add New Item</DrawerHeader>
                    <DrawerBody>
                        <div className="flex flex-col gap-6">
                            <FormControl label="Item Name">
                                <CustomInput placeholder="Enter item name..." />
                            </FormControl>
                            <FormControl label="Description">
                                <CustomInput placeholder="Enter a brief description..." />
                            </FormControl>
                            <FormControl label="Category">
                                <CustomInput placeholder="Select a category..." />
                            </FormControl>
                        </div>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setIsOpen(false)}>
                            Save Item
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export const Default: StoryObj = {
    render: () => <InteractiveDrawer />,
};