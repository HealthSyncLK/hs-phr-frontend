import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DocumentUpload } from '../components/form/DocumentUpload';

const meta: Meta<typeof DocumentUpload> = {
    title: 'Form Controls/DocumentUpload',
    component: DocumentUpload,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DocumentUpload>;

export const Default: Story = {
    name: 'Empty State',
    render: () => {
        const [files, setFiles] = useState<File[]>([]);
        return <DocumentUpload files={files} onFilesChange={setFiles} />;
    },
};

export const WithFile: Story = {
    name: 'With a File Preview',
    render: () => {
        // In a real story, you might create a mock File object.
        // For this example, we'll just show the dropzone, as creating a mock
        // file for the preview is complex in Storybook.
        const [files, setFiles] = useState<File[]>([]);

        // You can test the preview state by dragging and dropping a file onto the 'Empty State' story.
        return <DocumentUpload files={files} onFilesChange={setFiles} />;
    },
};