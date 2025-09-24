'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConfig } from '../../../providers/ConfigProvider';
import { useAuth } from '../../../providers/AuthProvider';
import {
  createConsentSchema,
  createIdentificationSchema,
  createOtpSchema,
  createPersonalInfoSchema,
  createSignupSchema,
} from '../../../lib/schemas';
import { SignupScreen } from '../../../components/auth/SignupScreen';
import { OtpScreen } from '../../../components/auth/OtpScreen';
import { SignUpFormScreen } from '../../../components/auth/SignupFormScreen';
import { IdentificationScreen } from '../../../components/auth/IdentificationScreen';
import { ConsentScreen } from '../../../components/auth/ConsentScreen';
import { authService } from '../../services/authService';
import { docService } from '../../services/docService';
import { SignupRequest } from '../../types/signupRequest';
import { useAuthImage } from '../../../providers/AuthImageProvider';
import { AUTH_IMAGES } from '../../../lib/authImageConfig';
import { useReactToPrint } from 'react-to-print';

export default function SignupPage() {
  const router = useRouter();
  const { config, isLoading: isConfigLoading } = useConfig();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // State to manage which step of the signup flow is active
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({});

  // State to manage the active login tab (email or mobile)
  const [signupMethod, setSignupMethod] = useState<'mobile' | 'email'>('mobile' );

  // State to store the session ID and contact info for the OTP step
  const [signupDetails, setSignupDetails] = useState({contact: '', session_id: ''});

  const consentRef = useRef<HTMLDivElement>(null);

  const { setCurrentImage } = useAuthImage(); 
  // update decorative image when step changes
  useEffect(() => {
    const stepKey = currentStep as keyof typeof AUTH_IMAGES.signup;
    const imageConfig = AUTH_IMAGES.signup[stepKey] || AUTH_IMAGES.default;
    setCurrentImage(imageConfig.src, imageConfig.cornerSrc);
  }, [currentStep, setCurrentImage]);

  // This useEffect handles redirecting users who are already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);


  // Signup Step: 1 - Details
  const signupSchema = useMemo(() => {
    if (config?.validation) {
      return createSignupSchema(config.validation);
    }
    return null;
  }, [config]);

  type SignupFormValues = z.infer<typeof signupSchema & object>;

  const methods = useForm<SignupFormValues>({
    resolver: signupSchema ? zodResolver(signupSchema) : undefined,
    mode: 'onChange',
    defaultValues: {
      signupMethod: 'mobile',
      phone: '',
      email: '',
    },
  });

  useEffect(() => {
    if (signupMethod === 'mobile') {
      methods.reset({ signupMethod: 'mobile', phone: '' });
    } else {
      methods.reset({ signupMethod: 'email', email: '' });
    }
  }, [signupMethod, methods]);

  const handleInitialSignup = async (data: any) => {
    try {
      const response = await authService.verifyContact({
        // TODO - Country code handling
        contact: signupMethod === 'mobile' ? `+94${data.phone}` : data.email,
        type: signupMethod === 'mobile' ? 'sms' : 'email',
      });

      // On success, save the contact info and session_id, then move to the OTP step
      setSignupDetails({
        contact: signupMethod === 'mobile' ? data.phone : data.email,
        session_id: response.session_id,
      });

      setCurrentStep(2); // Move to the OTP step
    } catch (error: any) {
      methods.setError('root.serverError', {
        type: 'manual',
        message: error.message,
      });

      // TODO - Check with apiClient Changes: throwing error with code property
      if (error.code === 'CONTACT_EXISTS') {
        // Navigate to login page if contact already exists
        router.push('/login');
      }
    }
  };


  // Signup Step: 2 - OTP
  const otpSchema = useMemo(() => {
    if (config?.validation) {
      return createOtpSchema(config.validation);
    }
    return null;
  }, [config]);

  const otpMethods = useForm({
    resolver: otpSchema ? zodResolver(otpSchema) : undefined,
    mode: 'onChange',
    // Add default value to prevent the TypeError
    defaultValues: {
      otp: '',
    },
  });

   // Handle data collection and move to the next step
  const handleNextStep = (dataFromChild: {}) => {
    setFormData((prev) => ({ ...prev, ...dataFromChild }));
    setCurrentStep(currentStep + 1);
  };

   // OTP form submission
  const handleOtpSubmit = async (data: any) => {
    try {
      await authService.verifySignupOtp({
        ...data,
        session_id: signupDetails.session_id,
      });

      setCurrentStep(3); // Move to the Identification step
    } catch (error: any) {
      otpMethods.setError('root.serverError', {
        type: 'manual',
        message: error.message
      });

     // Clear OTP input only, keep errors
     otpMethods.setValue('otp', '', { shouldValidate: false, shouldDirty: false });
    }
  };


  // Signup Step: 3 - Personal Info
  const personalInfoSchema = useMemo(() => {
    if (config?.validation) {
      return createPersonalInfoSchema(config.validation);
    }
    return null;
  }, [config]);

  const personalInfoMethods = useForm({
    resolver: personalInfoSchema ? zodResolver(personalInfoSchema) : undefined,
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      nic: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });


  // Signup Step: 4 - Identification (NIC upload)
  const identificationSchema = useMemo(() => {
    if (config?.validation) {
      return createIdentificationSchema(config.validation);
    }
    return null;
  }, [config]);

  const identificationMethods = useForm({
    resolver: identificationSchema
      ? zodResolver(identificationSchema)
      : undefined,
    mode: 'onChange',
    defaultValues: {
      nic: '',
      front: '',
      back: '',
    },
  });

   // Skip the identification step
  const handleSkipIdentification = () => {
    // Logic to send notification for future purpose
    console.log('Remind me later clicked. A notification will be sent.');
    // Skip to the next step (Consent Screen)
    setCurrentStep(5);
  };

  const handleIdentificationSubmit = async (data: any) => {
    try {
      if (!data.front || !data.back) {
        identificationMethods.setError('root.serverError', {
          type: 'manual',
          message: 'Please upload both front and back images of your NIC',
        });
        return;
      }

      // Create FormData for multiple file upload
      const formData = new FormData();

      formData.append('files', data.front);
      formData.append('files', data.back);
      formData.append('patientId', signupDetails.session_id); // Replace with actual patient ID when available
      formData.append('documentType', 'identification');

      const baseMetadata = {
        uploadSource: 'web-signup',
        timestamp: new Date().toISOString(),
        signupSessionId: signupDetails.session_id,
        nic: data.nic, // Include NIC number from form
      };

      formData.append('metadata', JSON.stringify(baseMetadata));

      await docService.uploadDocumentBatch(formData);

      // Move to next step (Consent screen)
      setCurrentStep(5);
    } catch (error: any) {
      console.error('NIC upload failed:', error);
      identificationMethods.setError('root.serverError', {
        type: 'manual',
        message:
          error.message ||
          'Failed to upload NIC documents. Please try again.',
      });
    }
  };


  // Signup Step: 5 - Consent
  const consentSchema = useMemo(() => {
    if (config?.validation) {
      return createConsentSchema(config.validation);
    }
    return null;
  }, [config]);

  const consentMethods = useForm({
    resolver: consentSchema ? zodResolver(consentSchema) : undefined,
    mode: 'onChange',
    defaultValues: {
      signature: '',
    },
  });

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: consentRef,
    documentTitle: "Consent Agreement",
    pageStyle: `
      @page {
        margin: 1in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        .print-content ul {
          list-style-type: disc;
          margin-left: 20px;
        }
        .print-content li {
          margin-bottom: 8px;
          line-height: 1.4;
        }
      }
        `,
  });

  const handleFinalSubmit = async (data: any) => {
    try {
      const finalData = { ...formData, ...data };
      const useData: SignupRequest = {
        session_id: signupDetails.session_id,
        contact_type: signupMethod === 'mobile' ? 'sms' : 'email',
        user_data: {
          username: signupDetails.contact,
          password: finalData.password,
          profile: {
            firstName: finalData.firstName,
            lastName: finalData.lastName,
            dob: finalData.dob,
            nic: finalData.nic,
            gender: finalData.gender,
          },
        },
      };
      await authService.signup(useData);
      router.push('/dashboard');
    } catch (error: any) {
      consentMethods.setError('root.serverError', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  // A function to render multi step signup process
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleInitialSignup)}>
              {methods.formState.errors.root?.serverError && (
                <div className="font-[Poppins] p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  { methods.formState.errors.root.serverError.message as string }
                </div>
              )}
              <SignupScreen
                signupMethod={signupMethod}
                setSignupMethod={setSignupMethod}
              />
            </form>
          </FormProvider>
        );
      case 2:
        return (
          <FormProvider {...otpMethods}>
            <form onSubmit={otpMethods.handleSubmit(handleOtpSubmit)}>
              {otpMethods.formState.errors.root?.serverError && (
                <div className="font-[Poppins] p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  { otpMethods.formState.errors.root.serverError.message as string }
                </div>
              )}
              <OtpScreen contact={signupDetails.contact} onResend={() => handleInitialSignup(methods.getValues())} />
            </form>
          </FormProvider>
        );
      case 3:
        return (
          <FormProvider {...personalInfoMethods}>
            <form
              onSubmit={personalInfoMethods.handleSubmit(handleNextStep)}>
              <SignUpFormScreen onNext={handleNextStep} />
            </form>
          </FormProvider>
        );
      case 4:
        return (
          <FormProvider {...identificationMethods}>
            <form onSubmit={identificationMethods.handleSubmit(handleIdentificationSubmit)}>
              {identificationMethods.formState.errors.root?.serverError && (
                <div className="font-[Poppins] p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  { identificationMethods.formState.errors.root.serverError.message as string }
                </div>
              )}
              <IdentificationScreen
                onNext={handleNextStep}
                onSkip={handleSkipIdentification}
                formData={formData}
              />
            </form>
          </FormProvider>
        );
      case 5:
        return (
          <FormProvider {...consentMethods}>
            <form onSubmit={consentMethods.handleSubmit(handleFinalSubmit)}>
               {consentMethods.formState.errors.root?.serverError && (
                <div className="font-[Poppins] p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  { consentMethods.formState.errors.root.serverError.message as string }
                </div>
              )}
              <ConsentScreen onNext={handleFinalSubmit} onPrint={handlePrint} ref={consentRef}/>
            </form>
          </FormProvider>
        );
      default:
        return <div>Registration complete!</div>;
    }
  };

  if (isAuthLoading || isConfigLoading || !config || !signupSchema) {
    return <div>Loading...</div>;
  }

  return <div>{renderStep()}</div>;
}