import { z } from 'zod';

// This function takes the validation config and returns a Zod schema
export const createLoginSchema = (config: any) => {
    const passwordConfig = config.password;
    const phoneConfig = config.phone;

    return z.object({
        phone: z.string().min(phoneConfig.minLength, phoneConfig.minLengthMessage),
        password: z.string()
            .min(passwordConfig.minLength, passwordConfig.minLengthMessage)
            .regex(new RegExp(passwordConfig.uppercaseRegex), passwordConfig.uppercaseMessage)
            .regex(new RegExp(passwordConfig.numberRegex), passwordConfig.numberMessage)
            .regex(new RegExp(passwordConfig.specialCharRegex), passwordConfig.specialCharMessage),
    });
};

// You would create a similar builder for the signup schema
// export const createSignupSchema = (config: any) => { ... };