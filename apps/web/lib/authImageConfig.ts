// Configuration for auth flow images
export const AUTH_IMAGES = {
  signup: {
    1: { // Initial signup
      src: "/assets/signup/initial.jpg",
      cornerSrc: "/assets/logoCorner.png",
      alt: "Welcome to our platform",
      text: "Peace of mind knowing all my parents'medical records are safely stored"
    },
    2: { // OTP verification
      src: "/assets/signup/otp.jpg", 
      cornerSrc: "/assets/logoCorner.png",
      alt: "Verify your contact",
      text: "Finally, I feel in control of my health and my loved ones'care"
    },
    3: { // Personal info
      src: "/assets/signup/signupForm.jpg",
      cornerSrc: "/assets/logoCorner.png", 
      alt: "Complete your profile",
      text: "Their health history grows, and I track it all in one place"
    },
    4: { // Identification
      src: "/assets/signup/identification.jpg",
      cornerSrc: "/assets/logoCorner.png",
      alt: "Verify your identity",
      text: "I feel safer knowing my children can access my reords if needed"
    },
    5: { // Consent
      src: "/assets/signup/consent.jpg",
      cornerSrc: "/assets/logoCorner.png",
      alt: "Consent and agreement",
      text: "Even from Canada, I help manage my parents' medicine and doctor visits"
    }
  },
  login: {
    initial: {
      src: "/assets/login/initial.jpg",
      cornerSrc: "/assets/logoCorner.png",
      alt: "Sign in to your account",
      text: "Peace of mind knowing all my parents'medical records are safely stored"
    },
    otp: {
      src: "/assets/login/doctor.jpg",
      cornerSrc: "/assets/logoCorner.png", 
      alt: "Verify login code",
      text: "Finally, I feel in control of my health and my loved ones'care"
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