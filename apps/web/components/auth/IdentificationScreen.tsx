'use client';
import { FileUploader } from '@repo/ui/components/form/FileUploader';
import { Input } from '@repo/ui/components/form/Input';
import { Button } from '@repo/ui/components/general/Button';
import { Typography } from '@repo/ui/components/general/Typography';
import { Controller, useFormContext } from 'react-hook-form';
import { useConfig } from '../../providers/ConfigProvider';
import { FormControl } from '@repo/ui/components/form/FormControl';
import { useEffect, useState } from 'react';

interface IdentificationScreenProps {
  onNext: (data: any) => void;
  onSkip: (data: any) => void;
  formData: { nic?: string };
}

export const IdentificationScreen = ({
  onNext,
  onSkip,
  formData,
}: IdentificationScreenProps) => {
  const { config } = useConfig();
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    reset, // Get the reset function
  } = useFormContext();

  // Use useEffect to update the form's state with formData
  useEffect(() => {
    if (formData && formData.nic) {
      reset({ nic: formData.nic });
    }
  }, [reset, formData]); // Add reset and formData as dependencies

  const formConfig = config?.ui?.identificationForm;

  if (!formConfig) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="w-95 max-w-md mx-auto mt-5">
      <Typography variant="h1">{formConfig.title}</Typography>
      <Typography variant="body1" className="py-2">
        {formConfig.description}
      </Typography>

      <div className="my-5">
        <Controller
          name="nic"
          control={control}
          render={({ field }) => (
            <FormControl label={formConfig.fields.nic.label}>
              <Input
                type=""
                placeholder={formConfig.fields.nic.placeholder}
                hasError={!!errors.nic}
                {...field}
              />
              {errors.nic && (
                <p className="text-red-500 text-sm">
                  {errors.nic?.message as string}
                </p>
              )}
            </FormControl>
          )}
        />
      </div>

      <div className="mb-5">
        <Controller
          name="front"
          control={control}
          render={({ field }) => (
            <FormControl label={formConfig.fields.front.label}>
              <FileUploader onFileChange={field.onChange} />
            </FormControl>
          )}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="back"
          control={control}
          render={({ field }) => (
            <FormControl label={formConfig.fields.back.label}>
              <FileUploader onFileChange={field.onChange} />
            </FormControl>
          )}
        />
      </div>

      <div>
        <Button
          variant={'primary'}
          className="w-full mt-4"
          type="submit" 
          disabled={!isValid || isSubmitting}
        >
          {formConfig.buttons.next}{' '}
        </Button>
      </div>

      <div className="text-center pt-5">
        <Typography className="cursor-pointer text-primary" onClick={onSkip}>
          {formConfig.labels.remindMe}{' '}
        </Typography>
      </div>
    </div>
  );
};
