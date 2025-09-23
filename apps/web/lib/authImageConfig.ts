// Configuration for auth flow images
export const AUTH_IMAGES = {
  signup: {
    1: { // Initial signup
      src: "/assets/initial.jpg",
      cornerSrc: "/assets/logoCorner.png",
      alt: "Welcome to our platform"
    },
    2: { // OTP verification
      src: "/assets/signup/otp.jpg", 
      cornerSrc: "/assets/logoCorner.png",
      alt: "Verify your contact"
    },
    3: { // Personal info
      src: "/assets/signup/signupForm.jpg",
      cornerSrc: "/assets/logoCorner.png", 
      alt: "Complete your profile"
    },
    4: { // Identification
      src: "/assets/signup/identification.jpg",
      cornerSrc: "/assets/logoCorner.png",
      alt: "Verify your identity"
    },
    5: { // Consent
      src: "/assets/signup/consent.jpg",
      cornerSrc: "/assets/logoCorner.png",
      alt: "Consent and agreement"
    }
  },
  login: {
    initial: {
      src: "/assets/login/initial.jpg",
      cornerSrc: "/assets/logoCorner.png",
      alt: "Sign in to your account"
    },
    otp: {
      src: "/assets/login/doctor.jpg",
      cornerSrc: "/assets/logoCorner.png", 
      alt: "Verify login code"
    }
  },
  default: {
    src: "/assets/family.jpg",
    cornerSrc: "/assets/logoCorner.png",
    alt: "Healthcare platform"
  }
} as const;

export type AuthFlowType = keyof typeof AUTH_IMAGES;
export type SignupStep = keyof typeof AUTH_IMAGES.signup;
export type LoginStep = keyof typeof AUTH_IMAGES.login;