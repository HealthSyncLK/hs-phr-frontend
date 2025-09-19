'use client';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useConfig } from '../../providers/ConfigProvider';
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components/navigation/Tabs';
import { Typography } from '@repo/ui/components/general/Typography';
import { FormControl } from '@repo/ui/components/form/FormControl';
import { PhoneInput } from '@repo/ui/components/form/PhoneInput';
import { Input } from '@repo/ui/components/form/Input';
import { Button } from '@repo/ui/components/general/Button';
import Link from 'next/link';

type SignupMethod = 'mobile' | 'email';
interface SignupScreenProps {
  signupMethod: SignupMethod;
  setSignupMethod: (method: SignupMethod) => void;
}

export const SignupScreen = ({
  signupMethod,
  setSignupMethod,
}: SignupScreenProps) => {
  const { config } = useConfig();
  const {
    control,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext();

  const formConfig = config?.ui?.initialSignupForm;

  if (!formConfig) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="w-95 max-w-md mx-auto">
      <div className="mb-6 text-left">
        <Typography variant="h1">{formConfig.title}</Typography>
        <Typography variant="body1" className="text-text-light mt-2">
          {formConfig.description}
        </Typography>
      </div>

      <Tabs
        value={signupMethod}
        onValueChange={(value) => setSignupMethod(value as SignupMethod)}
      >
        <TabsList className="w-full">
          <TabsTrigger value="mobile" className="flex-1">
            Mobile
          </TabsTrigger>
          <TabsTrigger value="email" className="flex-1">
            Email
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 space-y-6">
        {signupMethod === 'mobile' ? (
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormControl label={formConfig.fields.phone.label}>
                <PhoneInput
                  countryCode="+94"
                  onCountryCodeChange={() => {}}
                  placeholder={formConfig.fields.phone.placeholder}
                  error={!!errors.phone}
                  {...field}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.phone?.message as string}
                  </p>
                )}
              </FormControl>
            )}
          />
        ) : (
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormControl label={formConfig.fields.email.label}>
                <Input
                  type="email"
                  placeholder={formConfig.fields.email.placeholder}
                  hasError={!!errors.email}
                  {...field}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email?.message as string}
                  </p>
                )}
              </FormControl>
            )}
          />
        )}
      </div>
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting
          ? `${formConfig.buttons.processing}`
          : `${formConfig.buttons.signup}`}
      </Button>

      <div className="text-center pt-5">
        <Typography variant="body2" className="text-base text-text-header">
          {formConfig.labels.accountExist}
          <span>
            <Link
              href={'/auth/login'}
              className="text-primary pl-2 hover:underline"
            >
              {formConfig.labels.login}
            </Link>
          </span>
        </Typography>
      </div>
    </div>
  );
};
