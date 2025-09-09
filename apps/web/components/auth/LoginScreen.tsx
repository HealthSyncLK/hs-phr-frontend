'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useConfig } from '../../providers/ConfigProvider';
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components/navigation/Tabs';
import { Typography } from '@repo/ui/components/general/Typography';
import { FormControl } from '@repo/ui/components/form/FormControl';
import { PhoneInput } from '@repo/ui/components/form/PhoneInput';
import { Input } from '@repo/ui/components/form/Input';
import { Checkbox } from '@repo/ui/components/form/CheckBox';
import { Button } from '@repo/ui/components/general/Button';


type LoginMethod = 'mobile' | 'email';
interface LoginScreenProps {
    loginMethod: LoginMethod;
    setLoginMethod: (method: LoginMethod) => void;
}

export const LoginScreen = ({ loginMethod, setLoginMethod }: LoginScreenProps) => {
    const { config } = useConfig();
    const {
        control,
        formState: { errors, isValid, isSubmitting },
    } = useFormContext();

    const formConfig = config?.ui?.loginForm;

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

            <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as LoginMethod)}>
                <TabsList className="w-full">
                    <TabsTrigger value="mobile" className="flex-1">Mobile</TabsTrigger>
                    <TabsTrigger value="email" className="flex-1">Email</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mt-6 space-y-6">
                {loginMethod === 'mobile' ? (
                    <Controller name="phone" control={control} render={({ field }) => (
                        <FormControl label={formConfig.fields.phone.label}>
                            <PhoneInput countryCode="+94" onCountryCodeChange={() => { }} placeholder={formConfig.fields.phone.placeholder} error={!!errors.phone} {...field} />
                        </FormControl>
                    )} />
                ) : (
                    <Controller name="email" control={control} render={({ field }) => (
                        <FormControl label="Email Address">
                            <Input type="email" placeholder="Enter your email address" hasError={!!errors.email} {...field} />
                        </FormControl>
                    )} />
                )}

                <Controller name="password" control={control} render={({ field }) => (
                    <FormControl label={formConfig.fields.password.label}>
                        <Input type="password" placeholder={formConfig.fields.password.placeholder} hasError={!!errors.password} {...field} />
                    </FormControl>
                )} />
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
        </div>
    );
};