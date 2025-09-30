'use client';

import { Button } from '@repo/ui/components/general/Button';
import { CustomIcon } from '@repo/ui/components/general/CustomIcon';
import { Typography } from '@repo/ui/components/general/Typography';
import React, { useState } from 'react';
import { HealthRecord } from '../../app/types/record';
import { Card } from '@repo/ui/components/app/Card';
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components/navigation/Tabs';
import { RecordDetailForm } from './RecordDetailForm';
import dynamic from "next/dynamic";

const DocumentPreviewer = dynamic(
    () => import("../common/DocumentPreviewer"),
    { ssr: false }
);

interface RecordDetailViewProps {
    record: HealthRecord | null;
}

type DetailTab = 'document' | 'ai-report' | 'detail';

export const RecordDetailView = ({ record }: RecordDetailViewProps) => {
    const [activeTab, setActiveTab] = useState<DetailTab>('document');

    if (!record) {
        return (
            <Card className="h-full flex items-center justify-center">
                <Typography className="text-text-light">Select a record to view details</Typography>
            </Card>
        );
    }

    return (
        <div className="p-2 flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DetailTab)}>
                    <TabsList>
                        <TabsTrigger value="document">Document</TabsTrigger>
                        <TabsTrigger value="ai-report">AI Report</TabsTrigger>
                        <TabsTrigger value="detail">Detail</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Button variant="tertiary" size="sm" className="gap-2.5">
                    <span>Full Screen</span>
                    <CustomIcon name="expand" className="w-[11px] h-[11px]" />
                </Button>
            </div>

            <div className="flex-grow flex flex-col w-full">
                {activeTab === 'document' && (
                    // In a real app, you'd pass the actual document URL from the record object
                    <div>
                        <DocumentPreviewer fileUrl="/example.pdf" />
                        <div className="flex-shrink-0 flex items-center justify-center gap-3 mt-3">
                            <Button variant="ghost" size="xs">
                                <CustomIcon name="qr-code" className="w-4 h-4 mr-2" />
                                <Typography variant="body2" className='text-text-header'>QR</Typography>
                            </Button>
                            <Button variant="ghost" size="xs" >
                                <CustomIcon name="print" className="w-4 h-4 mr-2" />
                                <Typography variant="body2" className='text-text-header'>Print</Typography>
                            </Button>
                            <Button variant="ghost" size="xs" >
                                <CustomIcon name="link" className="w-4 h-4 mr-2" />
                                <Typography variant="body2" className='text-text-header'>Link</Typography>
                            </Button>
                            <Button variant="ghost" size="xs" >
                                <CustomIcon name="download" className="w-4 h-4 mr-2" />
                                <Typography variant="body2" className='text-text-header'>Download</Typography>
                            </Button>
                        </div>
                    </div>
                )}
                {activeTab === 'ai-report' && (
                    <div className="flex items-center justify-center h-full"><Typography>AI Report Content Goes Here</Typography></div>
                )}
                {activeTab === 'detail' && (
                    <RecordDetailForm record={record} isEditMode={true} />)}
            </div>
        </div>
    );
};
