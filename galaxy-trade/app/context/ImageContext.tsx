'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ImageContextType = {
  images: string[];
  setImages: (images: string[]) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};

type ImageProviderProps = {
  children: ReactNode;
};

export const ImageProvider = ({ children }: ImageProviderProps) => {
  const [images, setImages] = useState<string[]>(JSON.parse(localStorage.getItem("uploadedImages") || "[]"));

  // Update localStorage whenever images state changes
  const setImagesInContext = (newImages: string[]) => {
    localStorage.setItem("uploadedImages", JSON.stringify(newImages));
    setImages(newImages);
  };

  return (
    <ImageContext.Provider value={{ images, setImages: setImagesInContext }}>
      {children}
    </ImageContext.Provider>
  );
};
