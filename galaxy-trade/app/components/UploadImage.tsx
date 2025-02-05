'use client';

import { IconButton } from "@chakra-ui/react";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useImageContext } from '../context/ImageContext';

const UploadImage = () => {
  const { imageSrc } = useImageContext();

  const handleUploadSuccess = (publicId: string) => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]");
    const updatedImages = [...storedImages, publicId];
    
    // Update the context and localStorage
    imageSrc(updatedImages);
  };

  return (
    <CldUploadWidget
      // Cloudinary upload preset
      uploadPreset="ml_default"
      // What options show up in the widget
      options={{ sources: ['local', 'url', 'camera', 'google_drive', 'dropbox'],
        styles: { container: "cloudinary-widget" },
      }}
      // What to do with the upload results
      onSuccess={(results: CloudinaryUploadWidgetResults) => {
        if (typeof results.info === 'object' && results.info?.public_id) {
          handleUploadSuccess(results.info.public_id);
        } else {
          console.error("Invalid upload results:", results);
        }
      }}
    >
      {/* Button */}
      {({ open }) => (
        <IconButton p={3} className="mx-3 hover:cursor-pointer active:scale-[.95]" onClick={() => open()}>
          Upload Image
        </IconButton>
      )}
    </CldUploadWidget>
  );
};

export default UploadImage;
