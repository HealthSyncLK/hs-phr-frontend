'use client';
import { Input } from '@repo/ui/components/form/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/form/Select';
import { Button } from '@repo/ui/components/general/Button';
import { Typography } from '@repo/ui/components/general/Typography';
import Link from 'next/link';
import { useConfig } from '../../providers/ConfigProvider';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl } from '@repo/ui/components/form/FormControl';
import { PhoneInput } from '@repo/ui/components/form/PhoneInput';
import { DatePickerInput } from '@repo/ui/components/form/DatePickerInput';

interface SignUpFormScreenProps {
  onNext: (data: any) => void;
}

export const SignUpFormScreen = ({ onNext }: SignUpFormScreenProps) => {
  const { config } = useConfig();
  const {
    control,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext();

  const formConfig = config?.ui?.signupForm;

  if (!formConfig) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="w-95 max-w-md mx-auto mt-5">
      <Typography variant="h1" className="py-5">
        {formConfig.title}
      </Typography>

      <div className="flex gap-4 mb-5 xl:block xl:space-y-5 xl:mb-0">
        <div className="flex-1 xl:block xl:mb-5">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormControl label={formConfig.fields.firstName.label}>
                <Input
                  type=""
                  placeholder={formConfig.fields.firstName.placeholder}
                  hasError={!!errors.firstName}
                  {...field}
                />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 leading-tight">
                      {errors.firstName?.message as string}
                    </p>
                  )}
              </FormControl>
            )}
          />
        </div>
        <div className="flex-1 xl:block">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormControl label={formConfig.fields.lastName.label}>
                <Input
                  type=""
                  placeholder={formConfig.fields.lastName.placeholder}
                  hasError={!!errors.lastName}
                  {...field}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 leading-tight">
                    {errors.lastName?.message as string}
                  </p>
                )}
              </FormControl>
            )}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-5 xl:block xl:space-y-5 xl:mt-5">
        <div className="flex-1 xl:block xl:mb-5">
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <FormControl label={formConfig.fields.dob.label}>
                <DatePickerInput
                  value={field.value}
                  onChange={field.onChange}
                  hasError={!!errors.dob}
                ></DatePickerInput>
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1 leading-tight">
                    {errors.dob?.message as string}
                  </p>
                )}
              </FormControl>
            )}
          />
        </div>
        <div className="flex-1 xl:block">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl label={formConfig.fields.gender.label}>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="PreferNotToSay">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* {errors.gender && (
                    <p className="text-red-500 text-sm mt-2">{errors.gender.message}</p>
                  )} */}
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1 leading-tight">
                    {errors.gender?.message as string}
                  </p>
                )}
              </FormControl>
            )}
          />
        </div>
      </div>

      <div className="mb-5">
        <Controller
          name="nic"
          control={control}
          render={({ field }) => (
            <FormControl label={formConfig.fields.nic.label}>
              <Input
                type="text"
                placeholder={formConfig.fields.nic.placeholder}
                hasError={!!errors.nic}
                {...field}
              />
              {errors.nic && (
                <p className="text-red-500 text-sm mt-1 leading-tight">
                  {errors.nic?.message as string}
                </p>
              )}
            </FormControl>
          )}
        />
      </div>

      <div className="mb-5">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormControl label={formConfig.fields.email.label}>
              <Input
                type=""
                placeholder={formConfig.fields.email.placeholder}
                hasError={!!errors.email}
                {...field}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 leading-tight">
                  {errors.email?.message as string}
                </p>
              )}
            </FormControl>
          )}
        />
      </div>

      <div className="mb-5">
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
                <p className="text-red-500 text-sm mt-1 leading-tight">
                  {errors.phone?.message as string}
                </p>
              )}
            </FormControl>
          )}
        />
      </div>

      <div className="mb-5">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormControl label={formConfig.fields.password.label}>
              <Input
                type="password"
                placeholder={formConfig.fields.password.placeholder}
                hasError={!!errors.password}
                {...field}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 leading-tight">
                  {errors.password?.message as string}
                </p>
              )}
            </FormControl>
          )}
        />
      </div>

      <div className="mb-5">
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <FormControl label={formConfig.fields.confirmPassword.label}>
              <Input
                type="password"
                placeholder={formConfig.fields.confirmPassword.placeholder}
                hasError={!!errors.confirmPassword}
                {...field}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 leading-tight">
                  {errors.confirmPassword?.message as string}
                </p>
              )}
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
          {formConfig.buttons.next}
        </Button>
      </div>

      <div className="text-center pt-5">
        <Typography>
          {formConfig.labels.accountExist}
          <span>
            <Link href={'/auth/login'} className="text-primary pl-2">
              {formConfig.labels.login}
            </Link>
          </span>
        </Typography>
      </div>
    </div>
  );
};
