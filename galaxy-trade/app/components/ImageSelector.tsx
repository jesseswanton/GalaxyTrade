'use client';

import { useEffect } from "react";
import { useImageContext } from "../context/ImageContext";
import {
  Image,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";

interface ImageSelectorProps {
  setUserPic: (pic: string) => void;
}

const ImageSelector = ({ setUserPic }: ImageSelectorProps) => {
  const { images } = useImageContext();

  useEffect(() => {
  }, []);

  const handleImageClick = (publicId: string) => {
    const newImageUrl = `https://res.cloudinary.com/dtmymakyr/image/upload/${publicId}`;
    setUserPic(newImageUrl);
  };

  return (
    <Box p={4}>
      <VStack gap={3}>
        {images.length > 0 ? (
          <HStack wrap="wrap" gap={2} justify="center">
            {images.map((publicId) => (
              <Image
                key={publicId}
                src={`https://res.cloudinary.com/dtmymakyr/image/upload/${publicId}`}
                alt="Uploaded Image"
                boxSize="150px"
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
    </Box>
  );
};

export default ImageSelector;
