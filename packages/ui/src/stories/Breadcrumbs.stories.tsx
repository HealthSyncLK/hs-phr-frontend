import type { Meta, StoryObj } from '@storybook/react';
import {
    Breadcrumbs,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../components/navigation/Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    title: 'Navigation/Breadcrumbs',
    component: Breadcrumbs,
    subcomponents: { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;


export const Default: Story = {
    render: () => (
        <Breadcrumbs>
            <BreadcrumbItem>
                <BreadcrumbLink href="#">Records</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>Health Records</BreadcrumbPage>
            </BreadcrumbItem>
        </Breadcrumbs>
    )
};