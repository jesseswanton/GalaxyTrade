"use client";

import { useImageContext } from "../context/ImageContext";
import { LuLibrary } from "react-icons/lu";
import {
  IconButton,
  Image,
  VStack,
  HStack,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ImageLibrary = () => {
  const { images } = useImageContext();

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        {size.width < 768 ? (
          <IconButton rounded={"full"} className="hover:cursor-pointer active:scale-[.95] my-1">
            <LuLibrary />
          </IconButton>
        ) : (
          <IconButton
            p={3}
            className="mx-3 hover:cursor-pointer active:scale-[.95] my-1"
          >
            Image Library
          </IconButton>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="popover-content p-4 w-64"
        overflowY="auto"
        maxHeight="600px"
        marginTop="30px"
        boxShadow="lg"
      >
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
