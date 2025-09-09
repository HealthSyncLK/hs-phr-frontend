import { z } from 'zod';

// This function takes the validation config and returns a Zod schema
export const createLoginSchema = (config: any) => {
    const { password: passwordConfig, phone: phoneConfig, email: emailConfig } = config;

    const baseLoginSchema = z.object({
        password: z.string()
            .min(1, passwordConfig.minLengthMessage)
    });

    const mobileLoginSchema = baseLoginSchema.extend({
        loginMethod: z.literal('mobile'),
        phone: z.string().min(phoneConfig.minLength, phoneConfig.minLengthMessage),
        email: z.string().optional(),
    });

    const emailLoginSchema = baseLoginSchema.extend({
        loginMethod: z.literal('email'),
        email: z.string().email(emailConfig.invalidMessage),
        phone: z.string().optional(),
    });

    // A discriminated union is the best way to handle forms that change based on a value
    return z.discriminatedUnion('loginMethod', [
        mobileLoginSchema,
        emailLoginSchema,
    ]);
};