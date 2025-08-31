import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SignaturePad } from '../components/form/SignaturePad';
import { Typography } from '../components/general/Typography';
import { Card } from '../components/app/Card';

const meta: Meta<typeof SignaturePad> = {
    title: 'Form Controls/SignaturePad',
    component: SignaturePad,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignaturePad>;

export const Default: Story = {
    name: 'Default Signature Pad',
    render: () => {
        const [signatureData, setSignatureData] = useState<string | null>(null);

        return (
            <div className="w-full max-w-lg">
                <SignaturePad
                    title="Signature"
                    description="Please sign in the box below"
                    onSignatureEnd={(signature) => setSignatureData(signature)}
                    onClear={() => setSignatureData(null)}
                />
                {signatureData && (
                    <div className="mt-4">
                        <Typography variant="h4">Captured Signature:</Typography>
                        <div className="p-4 mt-2 border rounded-md border-neutral-200">
                            <img src={signatureData} alt="The captured signature" />
                        </div>
                    </div>
                )}
            </div>
        );
    },
};