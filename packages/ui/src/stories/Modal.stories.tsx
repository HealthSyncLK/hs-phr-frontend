import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '../components/app/Modal';
import { Button } from '../components/general/Button';
import { Typography } from '../components/general/Typography';

const meta: Meta<typeof Modal> = {
    title: 'App Shell & Overlays/Modal',
    component: Modal,
    subcomponents: { ModalContent, ModalHeader, ModalBody, ModalFooter },
    tags: ['autodocs'],
};

export default meta;

// A wrapper is needed to manage state for the interactive story
const InteractiveModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalContent>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalBody>
                        <Typography>
                            Are you sure you want to perform this action? This can't be undone.
                        </Typography>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setIsOpen(false)}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export const Default: StoryObj = {
    render: () => <InteractiveModal />,
};

export const LongContent: StoryObj = {
    name: "With Scrolling Content",
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Long Modal</Button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <ModalContent>
                        <ModalHeader>Terms of Service</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam... (repeat this text many times to see scrolling)
                                </Typography>
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam... (repeat this text many times to see scrolling)
                                </Typography>
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam... (repeat this text many times to see scrolling)
                                </Typography>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="primary" onClick={() => setIsOpen(false)}>
                                I Understand
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    },
};