'use client';

import { CldImage } from 'next-cloudinary';
import { useImageContext } from '../context/ImageContext';

const DisplayImage = () => {
  const { images } = useImageContext();

  return (
    <CldImage
      src={images.length > 0 ? images[0] : ""}
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