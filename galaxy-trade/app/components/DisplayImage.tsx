'use client';

import { CldImage } from 'next-cloudinary';
import { useImageContext } from '../context/ImageContext';

const DisplayImage = () => {
  const { imageSrc } = useImageContext();

  return (
    <CldImage
        src={imageSrc}
        width="50"
        height="50"
        alt="Uploaded image"
        crop={{
          type: 'auto',
          source: true
        }}
    />
  );
};

export default DisplayImage;
