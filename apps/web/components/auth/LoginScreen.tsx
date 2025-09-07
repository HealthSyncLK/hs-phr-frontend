'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl } from '@repo/ui/components/form/FormControl';
import { Typography } from '@repo/ui/components/general/Typography';
import { PhoneInput } from '@repo/ui/components/form/PhoneInput';
import { Checkbox } from '@repo/ui/components/form/CheckBox';
import { Input } from '@repo/ui/components/form/Input';
import { Button } from '@repo/ui/components/general/Button';
import { useConfig } from '../../providers/ConfigProvider';

export const LoginScreen = () => {
    const { config } = useConfig();
    const {
        control,
        formState: { errors, isValid, isSubmitting },
    } = useFormContext();

    const formConfig = config?.ui?.loginForm;

    if (!formConfig) {
        // You can return a loading skeleton here
        return <div>Loading form...</div>;
    }

    return (
        <div className="w-100">
            <div className="mb-10 text-left">
                <Typography variant="h1">{formConfig.title}</Typography>
                <Typography variant="body1" className="text-text-light mt-2">
                    {formConfig.description}
                </Typography>
            </div>

            <div className="">
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <FormControl label={formConfig.fields.phone.label}>
                            <PhoneInput
                                countryCode="+94"
                                onCountryCodeChange={() => { }} // This can be wired up later
                                placeholder={formConfig.fields.phone.placeholder}
                                error={!!errors.phone}
                                {...field}
                            />
                        </FormControl>
                    )}
                />
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
                        </FormControl>
                    )}
                />
            </div>

            <div className="flex justify-between items-center my-6">
                <Checkbox label="Remember me" />
                <a href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot Password?
                </a>
            </div>

            <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>

            <Typography variant="body2" className="mt-6 text-center">
                Don't have an account?{' '}
                <a href="/signup" className="font-semibold text-primary hover:underline">
                    Sign Up
                </a>
            </Typography>
        </div>
    );
};