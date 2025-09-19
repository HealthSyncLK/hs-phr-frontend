'use client';
import React, { useState, useEffect, useMemo } from 'react';
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
import { SignupRequest } from '../../types/signupRequest';

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
      console.log('OTP handleInitialSignup:', data);
      const response = await authService.verifyContact({
        contact: signupMethod === 'mobile' ? data.phone : data.email,
        type: signupMethod === 'mobile' ? 'mobile' : 'email',
      });

      // On success, save the contact info and session_id, then move to the OTP step
      setSignupDetails({
        contact: signupMethod === 'mobile' ? data.phone : data.email,
        session_id: response.session_id,
      });

      setCurrentStep(2); // Move to the OTP step
    } catch (error: any) {
      // TODO : Displaying API error messages in UI
      methods.setError('root.serverError', {
        type: 'manual',
        message: error.message,
      });

      if (error.error === 'CONTACT_EXISTS') {
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
    console.log(dataFromChild, 'data');
    setCurrentStep(currentStep + 1);
  };

   // OTP form submission
  const handleOtpSubmit = async (data: any) => {
    try {
      console.log('OTP submitted:', data.otp);
      await authService.verifySignupOtp({
        ...data,
        session_id: signupDetails.session_id,
      });

      setCurrentStep(3); // Move to the Identification step
    } catch (error: any) {
      // Handle OTP verification errors
      otpMethods.setError('otp', {
        type: 'manual',
        message: 'Invalid OTP. Please try again.',
      });

      // TODO
      // If the OTP is incorrect, the system shall display an error message such as “Invalid code. Please try again” and clears the code entered.
      // If the OTP has expired, the system shall display a message such as “Code expired. Please request a new one”
      // The system shall display a countdown timer (e.g., “OTP expires in 02:00”).
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
    console.log(data, 'Identification data');
    try {
      if (!data.front || !data.back) {
        identificationMethods.setError('root.serverError', {
          type: 'manual',
          message: 'Please upload both front and back images of your NIC',
        });
        return;
      }

      // You'll need to get the actual patientId from your app state/context
      // For now, using signupDetails.session_id as a temporary identifier
      const uploadData: any = {
        patientId: signupDetails.session_id, // Replace with actual patient ID when available
        frontImage: data.front,
        backImage: data.back,
        metadata: {
          uploadSource: 'web-signup',
          timestamp: new Date().toISOString(),
          signupSessionId: signupDetails.session_id,
          nic: data.nic, // Include NIC number from form
        },
      };
      console.log('NIC uploadData', uploadData);

      const response = await authService.uploadNicDocument(uploadData);
      console.log('NIC uploaded successfully:', response);

      // Store the upload response in form data for later use
      setFormData((prev) => ({
        ...prev,
        ...data,
        nicDocuments: {
          front: response.data.front,
          back: response.data.back,
        },
      }));

      // Move to next step (Consent screen)
      setCurrentStep(5);
    } catch (error: any) {
      console.error('NIC upload failed:', error);
      identificationMethods.setError('root.serverError', {
        type: 'manual',
        message:
          error.message || 'Failed to upload NIC documents. Please try again.',
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

  const handleFinalSubmit = async (data: any) => {
    try {
      const finalData = { ...formData, ...data };
      console.log('Final registration data:', finalData);
      const useData: SignupRequest = {
        session_id: signupDetails.session_id,
        contact_type: signupMethod === 'mobile' ? 'mobile' : 'email',
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
            <form
              onSubmit={methods.handleSubmit(handleInitialSignup)}>
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
            <form
              onSubmit={otpMethods.handleSubmit(handleOtpSubmit)}>
              <OtpScreen contact={signupDetails.contact} />
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
            <form
              onSubmit={identificationMethods.handleSubmit(handleIdentificationSubmit)}>
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
            <form
              onSubmit={consentMethods.handleSubmit(handleFinalSubmit)}>
              <ConsentScreen onNext={handleFinalSubmit} />
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