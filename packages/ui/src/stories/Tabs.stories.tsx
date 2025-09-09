import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/navigation/Tabs';
import { Card } from '../components/app/Card';
import { Typography } from '../components/general/Typography';

const meta: Meta<typeof Tabs> = {
    title: 'Navigation/Tabs',
    component: Tabs,
    subcomponents: { TabsList, TabsTrigger, TabsContent },
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A set of layered sections of content, known as tab panels, that are displayed one at a time.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    name: 'Default Tabs',
    render: (args) => (
        <Card className="w-full max-w-2xl">
            <Tabs {...args}>
                <TabsList>
                    <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                    <TabsTrigger value="docs">Identification Docs</TabsTrigger>
                </TabsList>
                <TabsContent value="personal-info">
                    <Typography>
                        This is the content for the Personal Info tab. Here you can display
                        forms or information related to the user's personal details.
                    </Typography>
                </TabsContent>
                <TabsContent value="addresses">
                    <Typography>
                        This is the content for the Addresses tab. It might contain a list
                        of user addresses or a form to add a new one.
                    </Typography>
                </TabsContent>
                <TabsContent value="docs">
                    <Typography>
                        This is the content for the Identification Docs tab, showing all
                        related documents.
                    </Typography>
                </TabsContent>
            </Tabs>
        </Card>
    ),
    args: {
        value: 'personal-info',
    },
};