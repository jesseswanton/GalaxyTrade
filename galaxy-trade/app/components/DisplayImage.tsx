'use client';

import { CldImage } from 'next-cloudinary';

const DisplayImage = () => {
    return (
        <CldImage
            src="samples/logo" // Use this sample image or upload your own via the Media Explorer
            width="50" // Transform the image: auto-crop to square aspect_ratio
            height="50"
            alt="image"
            crop={{
            type: 'auto',
            source: true
            }}
        />
    );
};

export default DisplayImage;