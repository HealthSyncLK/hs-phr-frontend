
'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useConfig } from '../../providers/ConfigProvider';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerDescription } from '@repo/ui/components/app/Drawer';
import { RecordDetailForm } from './RecordDetailForm'; // Reusing the form component
import { recordsService } from '../../app/services/recordService';
import { Button } from '@repo/ui/components/general/Button';
import { CustomIcon } from '@repo/ui/components/general/CustomIcon';

interface AddDocumentDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback to refresh the records list
}

export const AddDocumentDrawer = ({ isOpen, onClose, onSuccess }: AddDocumentDrawerProps) => {
    const { config } = useConfig();
    // We pass a new, empty record object to the form for creation
    const mockEmptyRecord = { id: '', title: '', date: '', doctor: '', fileType: '', year: '' };

    const methods = useForm();
    const { handleSubmit, formState: { isSubmitting } } = methods;

    const formConfig = config?.ui?.addDocumentForm;

    const onSubmit = async (data: any) => {
        try {
            await recordsService.addHealthRecord(data);
            onSuccess(); // Call the success callback
            onClose();   // Close the drawer
        } catch (error: any) {
            console.error("Failed to add document:", error);
            // You can set a form error here if needed
        }
    };

    if (!formConfig) return null;

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerContent className="w-[512px]">
                <DrawerHeader>{formConfig.title}</DrawerHeader>
                <DrawerBody>
                    <FormProvider {...methods}>
                        {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden"> */}
                        {/* Here we reuse the form component, passing an empty record */}
                        <RecordDetailForm record={mockEmptyRecord} isEditMode={false} />
                        {/* </form> */}
                    </FormProvider>
                </DrawerBody>

            </DrawerContent>
        </Drawer>
    );
};