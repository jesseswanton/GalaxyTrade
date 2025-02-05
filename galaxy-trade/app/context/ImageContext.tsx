'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ImageContextType = {
  images: string[];
  imageSrc: (images: string[]) => void;
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
  const [images, imageSrc] = useState<string[]>([]);

  useEffect(() => {
    // Only run this on the client side
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]");
    imageSrc(storedImages);
  }, []);

  // Update localStorage whenever images state changes
  const setImagesInContext = (newImages: string[]) => {
    localStorage.setItem("uploadedImages", JSON.stringify(newImages));
    imageSrc(newImages);
  };

  return (
    <ImageContext.Provider value={{ images, imageSrc: setImagesInContext }}>
      {children}
    </ImageContext.Provider>
  );
};