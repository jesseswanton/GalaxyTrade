"use client";

import { useState, useEffect } from "react";
import { useImageContext } from "../context/ImageContext";
import {
  Button,
  Image,
  VStack,
  HStack,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";

const ImageLibrary = () => {
  const { setImageSrc } = useImageContext();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]");
    setImages(storedImages);
  }, []);

  const handleImageClick = (publicId: string) => {
    setImageSrc(publicId);
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">Image Library</Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-64">
        <VStack gap={3}>
          {images.length > 0 ? (
            <HStack wrap="wrap" gap={2}>
              {images.map((publicId) => (
                <Image
                  key={publicId}
                  src={`https://res.cloudinary.com/dtmymakyr/image/upload/${publicId}`}
                  alt="Uploaded Image"
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleImageClick(publicId)}
                />
              ))}
            </HStack>
          ) : (
            <p>No images uploaded yet.</p>
          )}
        </VStack>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default ImageLibrary;
