'use client';
import { Button } from '@repo/ui/components/general/Button';
import { Typography } from '@repo/ui/components/general/Typography';
import { SignaturePad } from '@repo/ui/components/form/SignaturePad';
import { ConsentBox } from '@repo/ui/components/form/ConsentBox';
import { Controller, useFormContext } from 'react-hook-form';
import { useConfig } from '../../providers/ConfigProvider';
import { FormControl } from '@repo/ui/components/form/FormControl';
import { forwardRef } from 'react';
interface ConsentScreenProps {
  onPrint: () => void; 
}

export const ConsentScreen = forwardRef<HTMLDivElement, ConsentScreenProps>(
  ({ onPrint }, ref) => {
  const { config } = useConfig();
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useFormContext();

  const formConfig = config?.ui?.consentForm;
  const signatureValue = watch('signature');

  if (!formConfig) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="w-95 max-w-md mx-auto mt-5">
      <Typography variant="h1">{formConfig.title}</Typography>
      <Typography variant="body1" className="py-2">
        {formConfig.description}
      </Typography>
      <div className="w-full mt-5">
        <ConsentBox
          title={`${formConfig.consent.title}`}
          content={
            <div className="text-text-header">
              {formConfig.consent.descTitle}
              <ul className="list-disc list-inside space-y-1">
                {formConfig.consent?.description?.length > 0 ? (
                  formConfig.consent.description.map(
                    (item: string, index: number) => (
                      <li key={index} className="text-sm leading-relaxed">
                        {item}
                      </li>
                    )
                  )
                ) : (
                  <li className="text-sm text-gray-500 italic">
                    Consent details not available
                  </li>
                )}
              </ul>
            </div>
          }
        ></ConsentBox>
      </div>
      <div className="mt-5">
        <Controller
          name="signature"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl>
              <SignaturePad
                title={`${formConfig.signature.title}`}
                description={`${formConfig.signature.description}`}
                onSignatureEnd={(dataUrl) => {
                  field.onChange(dataUrl); // store signature in RHF
                }}
                onClear={() => {
                  field.onChange(''); // clear the signature in form state
                }}
              ></SignaturePad>

              {fieldState.error && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </span>
              )}
            </FormControl>
          )}
        />
      </div>

      <div className="grid grid-cols-2 my-2">
        <div className="flex justify-end mr-2">
          <Button leftIcon="email" variant={'ghost'}>
            <Typography className="text-sm">
              {formConfig.buttons.email}
            </Typography>
          </Button>
        </div>
        <div className="flex justify-start ml-2">
          <Button leftIcon="print" variant={'ghost'} onClick={onPrint} disabled={!isValid || isSubmitting} type='button'>
            <Typography className="text-sm">
              {formConfig.buttons.print}
            </Typography>
          </Button>
        </div>
      </div>

      <div>
        <Button
          variant={'primary'}
          className="w-full mt-4"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {formConfig.buttons.register}
        </Button>
      </div>

      {/* Hidden print content */}
      <div ref={ref} className="hidden print:block">
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {formConfig.consent.pdfTitle}
          </h1>

          {/* Full consent content for printing */}
          <div className="mb-8">
            <h3 className="font-medium text-lg mb-4">
              {formConfig.consent.title}
            </h3>
            <div className="text-sm space-y-2">
              <div className="text-text-header">
                {formConfig.consent.descTitle}
                <ul className="list-disc list-inside space-y-1">
                  {formConfig.consent?.description?.length > 0 ? (
                    formConfig.consent.description.map(
                      (item: string, index: number) => (
                        <li key={index} className="text-sm leading-relaxed">
                          {item}
                        </li>
                      )
                    )
                  ) : (
                    <li className="text-sm text-gray-500 italic">
                      Consent details not available
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Signature section */}
        {signatureValue && (
          <div className="mt-8 pt-6 border-t border-gray-300">
            <h3 className="text-lg font-semibold mb-4">
              {formConfig.signature.title}
            </h3>
            <div className="mb-4">
              <img
                src={signatureValue}
                alt="Digital Signature"
                className="max-w-xs border border-gray-300 p-2 bg-white"
              />
            </div>
            <p className="text-sm text-gray-600">
              Digitally signed on: {new Date().toLocaleDateString()} at{' '}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
