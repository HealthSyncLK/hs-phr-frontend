'use client';

import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useConfig } from '../../providers/ConfigProvider';
import { HealthRecord } from '../../app/types/record';
import { Typography } from '@repo/ui/components/general/Typography';
import { FormControl } from '@repo/ui/components/form/FormControl';
import { Icon } from '@repo/ui/components/general/Icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/form/Select';
import { Input } from '@repo/ui/components/form/Input';
import { DatePicker } from '@repo/ui/components/form/DatePicker';
import { DatePickerInput } from '@repo/ui/components/form/DatePickerInput';
import { Textarea } from '@repo/ui/components/form/Textarea';
import { Button } from '@repo/ui/components/general/Button';


interface RecordDetailFormProps {
    record: HealthRecord;
}

export const RecordDetailForm = ({ record }: RecordDetailFormProps) => {
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
            notes: ''
        },
    });

    const formConfig = config?.ui?.recordDetailForm;

    if (!formConfig) return <div>Loading form...</div>; // Or a loading skeleton

    const onSubmit = (data: any) => {
        console.log('Saving changes:', data);
        // In a real app, you would call a service here to update the record
    };

    const { fields } = formConfig;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div className="flex-grow space-y-5 overflow-y-auto pr-2">
                    <Typography variant="h3">{formConfig.title}</Typography>

                    <FormControl label="Attached File">
                        <div className="relative w-[217px] h-[130px] border border-neutral-gray-100 rounded-lg flex items-center justify-center bg-gray-50 bg-cover bg-center" style={{ backgroundImage: "url(/path/to/your/preview.png)" }}>
                            <button type="button" className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-neutral-100">
                                <Icon name="x" className="w-4 h-4" />
                            </button>
                        </div>
                    </FormControl>

                    {/* Full-width fields */}
                    <FormControl label={fields.documentName.label}>
                        <Controller name="documentName" control={methods.control} render={({ field }) => <Input {...field} placeholder={fields.documentName.placeholder} />} />
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
                            <Controller name="documentType" control={methods.control} render={({ field }) => <Input {...field} placeholder={fields.documentType.placeholder} />} />
                        </FormControl>

                        <FormControl label={fields.documentDate.label}>
                            <Controller name="documentDate" control={methods.control} render={({ field: { onChange, value } }) => <DatePickerInput value={value} onChange={onChange} />} />
                        </FormControl>

                        <FormControl label={fields.doctorName.label}>
                            <Controller name="doctorName" control={methods.control} render={({ field }) => <Input {...field} placeholder={fields.doctorName.placeholder} />} />
                        </FormControl>

                        <FormControl label={fields.documentExpireDate.label}>
                            <Controller name="documentExpireDate" control={methods.control} render={({ field: { onChange, value } }) => <DatePickerInput value={value} onChange={onChange} />} />
                        </FormControl>
                    </div>

                    {/* More full-width fields */}
                    <FormControl label={fields.hospital.label}>
                        <Controller name="hospital" control={methods.control} render={({ field }) => <Input {...field} placeholder={fields.hospital.placeholder} />} />
                    </FormControl>

                    <FormControl label={fields.notes.label}>
                        <Controller name="notes" control={methods.control} render={({ field }) => <Textarea {...field} placeholder={fields.notes.placeholder} rows={4} />} />
                    </FormControl>
                </div>

                <div className="flex-shrink-0 flex items-center gap-6 pt-6 mt-auto border-t border-neutral-100">
                    <Button type="button" variant="danger" className="w-[148px]">Delete</Button>
                    <Button type="submit" variant="primary" className="ml-auto w-[340px]">Save Changes</Button>
                </div>
            </form>
        </FormProvider>
    );
};