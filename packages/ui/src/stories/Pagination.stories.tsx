import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/navigation/Pagination';

const meta: Meta<typeof Pagination> = {
    title: 'Navigation/Pagination',
    component: Pagination,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;


export const Default: Story = {
    name: 'Interactive Example',
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        return (
            <Pagination
                currentPage={currentPage}
                totalCount={125} // Total number of items
                pageSize={10}   // Items per page
                onPageChange={page => setCurrentPage(page)}
            />
        );
    },
};

export const FewPages: Story = {
    name: 'With Few Pages',
    args: {
        currentPage: 2,
        totalCount: 30,
        pageSize: 10,
    },
};