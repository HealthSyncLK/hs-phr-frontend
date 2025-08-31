import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from '../components/form/FileUploader';
import { Typography } from '../components/general/Typography';
import { FormControl } from '../components/form/FormControl';

const meta: Meta<typeof FileUploader> = {
    title: 'Form Controls/FileUploader',
    component: FileUploader,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
    name: 'Interactive Uploader',
    render: () => {
        const [uploadedFile, setUploadedFile] = useState<File | null>(null);

        return (
            <div className="max-w-md">
                <FormControl label="Upload Identification Document">
                    <FileUploader onFileChange={setUploadedFile} />
                </FormControl>

                {uploadedFile && (
                    <div className="mt-4 p-4 bg-neutral-50 rounded-md">
                        <Typography variant="caption">Parent Component State:</Typography>
                        <Typography variant="body2" className="font-mono text-sm">
                            File Name: {uploadedFile.name}
                        </Typography>
                        <Typography variant="body2" className="font-mono text-sm">
                            File Size: {Math.round(uploadedFile.size / 1024)} KB
                        </Typography>
                    </div>
                )}
            </div>
        );
    },
};