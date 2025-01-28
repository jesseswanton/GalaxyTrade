'use client';

import { useState, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import NextImage from 'next/image';
import { fetchNasaData } from '../api/fetchNasaData';
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from '../../components/ui/popover';
import { Button } from '../../components/ui/button';

interface NasaImage {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
}

const Carousel = () => {
  const [images, setImages] = useState<NasaImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  // Fetch NASA images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const randomImages = await fetchNasaData();
        setImages(randomImages);
      } catch (error) {
        console.error('Error fetching NASA images:', error);
      }
    };

    fetchImages();
  }, []);

  // Automatically update the image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30000); // Change image every 30 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentImage = images[currentIndex];

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  const toggleExplanation = () => {
    setIsExplanationVisible(!isExplanationVisible);
  };

  return (
    <Flex align="center">
      {/* Circular Image with Popover */}
      <PopoverRoot>
        <PopoverTrigger>
          <Box
            position="relative"
            width={isImageClicked ? '400px' : '100px'}
            height={isImageClicked ? '400px' : '100px'}
            overflow="hidden"
            borderRadius={isImageClicked ? '100%' : '50%'}
            marginRight="20px"
            flexShrink={0}
            cursor="pointer"
            transition="all 0.3s ease"
            onClick={handleImageClick}
          >
            <NextImage
              src={currentImage.url}
              alt={currentImage.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </Box>
        </PopoverTrigger>

        <PopoverContent p={4} borderRadius="md" boxShadow="lg" width="700px" portalled>
          <PopoverHeader textAlign="center">
            <Text p={2} fontWeight="bold">{currentImage.title}</Text>
          </PopoverHeader>
          <PopoverBody>
            <Flex p={2}  direction="row" gap={2} justify="space-between">
              <Button
                onClick={handlePrevImage}
                colorScheme="black"
                size="sm"
                flex="1"
              >
                Previous
              </Button>

              <Button
                onClick={toggleExplanation}
                colorScheme="black"
                size="sm"
                flex="1"
              >
                Image Details
              </Button>

              <Button
                onClick={handleNextImage}
                colorScheme="black"
                size="sm"
                flex="1"
              >
                Next
              </Button>
            </Flex>

            {isExplanationVisible && <Text p={2}>{currentImage.explanation}</Text>}
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </Flex>
  );
};

export default Carousel;