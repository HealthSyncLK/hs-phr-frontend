'use client';

import React, { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useConfig } from '../../providers/ConfigProvider';
import { HealthRecord } from '../../app/types/record';
import { Typography } from '@repo/ui/components/general/Typography';
import { FormControl } from '@repo/ui/components/form/FormControl';
import { DocumentUpload } from '@repo/ui/components/form/DocumentUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/form/Select';
import { CustomInput } from '@repo/ui/components/form/CustomInput';
import { DatePickerInput } from '@repo/ui/components/form/DatePickerInput';
import { TimePicker } from '@repo/ui/components/form/TimePicker';
import { Textarea } from '@repo/ui/components/form/Textarea';
import { Button } from '@repo/ui/components/general/Button';


interface RecordDetailFormProps {
    record: HealthRecord;
    isEditMode: boolean
}

export const RecordDetailForm = ({ record, isEditMode }: RecordDetailFormProps) => {
    const [files, setFiles] = useState<File[]>([]);

    const { config } = useConfig();
    const methods = useForm({
        // Populate the form with the selected record's data for editing
        defaultValues: {
            documentName: record.title,
            documentType: record.fileType,
            doctorName: record.doctor,
            documentDate: record.date,
            documentExpireDate: record.date,
            hospital: '',
            notes: '',
            reminderDate: record.date,
            time: {
                hour: 9,
                minute: 30,
            },
            reference: ''
        },
    });

    const formConfig = config?.ui?.recordDetailForm;

    if (!formConfig) return <div>Loading form...</div>; // Or a loading skeleton

    const onSubmit = (data: any) => {
        console.log('Saving changes:', data);
        // In a real app, you would call a service here to update the record
    };

    const { fields } = formConfig;

    console.log(formConfig.description)

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div className="flex-grow space-y-5 overflow-y-auto pr-2">
                    {!isEditMode && <div>
                        <Typography variant="body1_default" className='mb-4'>{formConfig.description}</Typography>
                        <FormControl label="">
                            <DocumentUpload files={files} onFilesChange={setFiles} />
                        </FormControl>
                    </div>}

                    {/* Full-width fields */}
                    <FormControl label={fields.documentName.label}>
                        <Controller name="documentName" control={methods.control} render={({ field }) => <CustomInput {...field} placeholder={fields.documentName.placeholder} />} />
                    </FormControl>

                    {/* Two-column grid for half-width fields */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                        <FormControl label={fields.documentStatus.label}>
                            <Select><SelectTrigger><SelectValue placeholder={fields.documentStatus.placeholder} /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem></SelectContent></Select>
                        </FormControl>

                        <FormControl label={fields.visibility.label}>
                            <Select><SelectTrigger><SelectValue placeholder={fields.visibility.placeholder} /></SelectTrigger><SelectContent><SelectItem value="private">Private</SelectItem></SelectContent></Select>
                        </FormControl>

                        <FormControl label={fields.documentType.label}>
                            <Controller name="documentType" control={methods.control} render={({ field }) => <CustomInput {...field} placeholder={fields.documentType.placeholder} />} />
                        </FormControl>

                        <FormControl label={fields.documentDate.label}>
                            <Controller name="documentDate" control={methods.control} render={({ field: { onChange, value } }) => <DatePickerInput value={value} onChange={onChange} />} />
                        </FormControl>

                        <FormControl label={fields.doctorName.label}>
                            <Controller name="doctorName" control={methods.control} render={({ field }) => <CustomInput {...field} placeholder={fields.doctorName.placeholder} />} />
                        </FormControl>

                        <FormControl label={fields.documentExpireDate.label}>
                            <Controller name="documentExpireDate" control={methods.control} render={({ field: { onChange, value } }) => <DatePickerInput value={value} onChange={onChange} />} />
                        </FormControl>
                    </div>

                    {/* More full-width fields */}
                    <FormControl label={fields.hospital.label}>
                        <Controller name="hospital" control={methods.control} render={({ field }) => <CustomInput {...field} placeholder={fields.hospital.placeholder} />} />
                    </FormControl>

                    <FormControl label={fields.notes.label}>
                        <Controller name="notes" control={methods.control} render={({ field }) => <Textarea {...field} placeholder={fields.notes.placeholder} rows={4} />} />
                    </FormControl>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                        <FormControl label={fields.reminderDate.label}>
                            <Controller name="reminderDate" control={methods.control} render={({ field: { onChange, value } }) => <DatePickerInput value={value} onChange={onChange} />} />
                        </FormControl>
                        <FormControl label={fields.reminderTime.label}>
                            <Controller name="time" control={methods.control} render={({ field: { onChange, value } }) => <TimePicker value={value} onChange={onChange} />} />
                        </FormControl>
                    </div>

                    <FormControl label={fields.reference.label}>
                        <Controller name="reference" control={methods.control} render={({ field }) => <CustomInput {...field} placeholder={fields.reference.placeholder} />} />
                    </FormControl>

                    <div className="flex-shrink-0 flex items-center gap-6 pt-6 mt-auto border-t border-neutral-100">
                        <Button type="button" variant="danger" className="w-[148px]">Delete</Button>
                        <Button type="submit" variant="primary" className="ml-auto w-[340px]">Save Changes</Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};