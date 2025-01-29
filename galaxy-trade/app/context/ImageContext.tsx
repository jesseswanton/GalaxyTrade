'use client';

import React, { createContext, useContext, useState } from 'react';

interface ImageContextType {
  imageSrc: string;
  setImageSrc: (src: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [imageSrc, setImageSrc] = useState<string>('samples/logo'); // Default image source

  return (
    <ImageContext.Provider value={{ imageSrc, setImageSrc }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
