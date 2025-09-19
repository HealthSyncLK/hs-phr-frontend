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


export const createSignupSchema = (config: any) => {
    const { phone: phoneConfig, email: emailConfig } = config;

    const baseSignupSchema = z.object({ });

    const mobileSignupSchema = baseSignupSchema.extend({
        signupMethod: z.literal('mobile'),
        phone: z.string().min(phoneConfig.minLength, phoneConfig.minLengthMessage),
        email: z.string().optional(),
    });

    const emailSignupSchema = baseSignupSchema.extend({
        signupMethod: z.literal('email'),
        email: z.string().email(emailConfig.invalidMessage),
        phone: z.string().optional(),
    });

    return z.discriminatedUnion('signupMethod', [
        mobileSignupSchema,
        emailSignupSchema,
    ]);
};

export const createOtpSchema = (config: any) => {
    const { otp: otpConfig } = config;

    const otpSchema = z.object({
         otp: z.string().min(otpConfig.minLength, otpConfig.invalidMessage),

     });

    return otpSchema;
};

export const createPersonalInfoSchema = (config: any) => {
  const {
    firstName: firstNameConfig,
    lastName: lastNameConfig,
    nic: nicConfig,
    email: emailConfig,
    password: passwordConfig,
    confirmPassword: confirmPasswordConfig,
    phone: phoneConfig,
    gender: genderConfig,
    dob: dobConfig,
  } = config;

  const personalInfoSchema = z.object({
    firstName: z
      .string()
      .nonempty(firstNameConfig.requiredMessage)
      .min(firstNameConfig.minLength, firstNameConfig.minLengthMessage)
      .max(firstNameConfig.maxLength, firstNameConfig.maxLengthMessage),
    lastName: z
      .string()
      .nonempty(lastNameConfig.requiredMessage)
      .min(lastNameConfig.minLength, lastNameConfig.minLengthMessage)
      .max(lastNameConfig.maxLength, firstNameConfig.maxLengthMessage),
    dob: z
      .string()
      .nonempty(dobConfig.requiredMessage)
      .refine(
        (dateString) => {
          const today = new Date();
          const dob = new Date(dateString);
          return dob < today;
        },
        {
          message: dobConfig.invalidMessage,
        }
      )
      .refine(
        (dateString) => {
          const today = new Date();
          const dob = new Date(dateString);
          let age = today.getFullYear() - dob.getFullYear();
          const m = today.getMonth() - dob.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
          }
          return age >= 18;
        },
        {
          message: dobConfig.invalidAgeMessage,
        }
      ),
    gender: z.string().nonempty(genderConfig.requiredMessage),
    nic: z
      .string()
      .min(nicConfig.minLength, nicConfig.minLengthMessage)
      .regex(new RegExp(nicConfig.patternRegex), nicConfig.patternMessage),
    email: z
      .string()
      .trim()
      .email(emailConfig.invalidMessage)
      .optional()
      .or(z.literal(''))
      .transform((e) => (e === '' ? undefined : e)),
    phone: z.string().min(phoneConfig.minLength, phoneConfig.minLengthMessage),
    password: z
      .string()
      .min(passwordConfig.minLength, passwordConfig.minLengthMessage)
      .regex(
        new RegExp(passwordConfig.uppercaseRegex),
        passwordConfig.uppercaseMessage
      )
      .regex(
        new RegExp(passwordConfig.numberRegex),
        passwordConfig.numberMessage
      )
      .regex(
        new RegExp(passwordConfig.specialCharRegex),
        passwordConfig.specialCharMessage
      ),
    confirmPassword: z.string().nonempty(confirmPasswordConfig.requiredMessage)
  });

  return personalInfoSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
      message: confirmPasswordConfig.passwordMatch,
      path: ['confirmPassword'],
    },
  );
};

export const createIdentificationSchema = (config: any) => {
  const { identification: identificationConfig } = config;

  const identificationSchema = z.object({
    nic: z.string().min(1, 'NIC is required.'),
    front: z.any().optional(),
    back: z.any().optional(),
  });

  return identificationSchema;
};

export const createConsentSchema = (config: any) => {
  const { consent: consentConfig } = config;

  const consentSchema = z.object({
    signature: z
      .string() // store signature as data URL (string)
      .nonempty('Signature is required.'), // ensures it's not empty
  });

  return consentSchema;
};
