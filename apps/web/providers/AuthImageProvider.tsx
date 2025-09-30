'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthImageContextType {
  currentImage: string;
  currentCornerImage?: string
  setCurrentImage: (imageSrc: string, cornerSrc?: string) => void;
  currentSpeechBubbleText?: string,
  setCurrentSpeechBubbleText: (text: string) => void;
}

const AuthImageContext = createContext<AuthImageContextType | undefined>(undefined);

interface AuthImageProviderProps {
  children: ReactNode;
  defaultImage?: string;
  defaultCornerImage?: string;
  defaultSpeechBubbleText?: string
}

export const AuthImageProvider: React.FC<AuthImageProviderProps> = ({
  children,
  defaultImage = "/assets/family.jpg",
  defaultCornerImage = "/assets/logoCorner.png",
  defaultSpeechBubbleText = "Welcome to HealthSync"
}) => {
  const [currentImage, setCurrentImageState] = useState(defaultImage);
  const [currentCornerImage, setCurrentCornerImage] = useState(defaultCornerImage);
  const [currentSpeechBubbleText, setCurrentSpeechBubbleText] = useState(defaultSpeechBubbleText);

  const setCurrentImage = (imageSrc: string, cornerSrc?: string) => {
    setCurrentImageState(imageSrc);
    if (cornerSrc) {
      setCurrentCornerImage(cornerSrc);
    }
  };

  return (
    <AuthImageContext.Provider value={{
      currentImage,
      currentCornerImage,
      currentSpeechBubbleText,
      setCurrentSpeechBubbleText,
      setCurrentImage
    }}>
      {children}
    </AuthImageContext.Provider>
  );
};

export const useAuthImage = () => {
  const context = useContext(AuthImageContext);
  if (context === undefined) {
    throw new Error('useAuthImage must be used within an AuthImageProvider');
  }
  return context;
};