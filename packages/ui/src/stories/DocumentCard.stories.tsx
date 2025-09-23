import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DocumentCard } from '../components/composites/DocumentCard';
import { DropdownMenuContent, DropdownMenuItem } from '../components/navigation/DropdownMenu';
import { CustomIcon } from '../components/general/CustomIcon';
import { Typography } from '../components/general/Typography';
import { Card } from '../components/app/Card';

const meta: Meta<typeof DocumentCard> = {
    title: 'App-Specific Composites/DocumentCard',
    component: DocumentCard,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DocumentCard>;

// Define the menu content once to reuse it in the stories
const exampleMenuContent = (
    <DropdownMenuContent className="w-40">
        <DropdownMenuItem>
            <CustomIcon name="eye" className="w-4 h-4 mr-2" />
            <span>View</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <CustomIcon name="download" className="w-4 h-4 mr-2" />
            <span>Download</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-danger-text focus:bg-danger focus:text-white">
            <CustomIcon name="trash" className="w-4 h-4 mr-2" />
            <span>Delete</span>
        </DropdownMenuItem>
    </DropdownMenuContent>
);

export const Default: Story = {
    name: 'Single Document Card',
    args: {
        icon: 'document',
        iconBgClass: 'bg-blue-100',
        title: 'Medical History Report',
        subtitle: 'Last updated on 25 Aug 2025',
        menuContent: exampleMenuContent,
    },
};

export const InAList: Story = {
    name: 'In a "Recent Documents" List',
    render: () => (
        <Card className="w-full max-w-md p-4">
            <Typography variant="h3" className="mb-4">Recent Documents</Typography>
            <div className="flex flex-col gap-3">
                <DocumentCard
                    icon="document"
                    iconBgClass="bg-blue-100"
                    title="Annual Check-up Results"
                    subtitle="21 Aug 2025"
                    menuContent={exampleMenuContent}
                />
                <DocumentCard
                    icon="heart-rate"
                    iconBgClass="bg-red-100"
                    title="ECG Report"
                    subtitle="15 Aug 2025"
                    menuContent={exampleMenuContent}
                />
                <DocumentCard
                    icon="document"
                    iconBgClass="bg-green-100"
                    title="Insurance Claim"
                    subtitle="12 Aug 2025"
                    menuContent={exampleMenuContent}
                />
            </div>
        </Card>
    )
}