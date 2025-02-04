//Add compenent by using "import UploadImage from './components/UploadImage';"
// and adding "<UploadImage />"

'use client';

import { Button } from "@chakra-ui/react";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useImageContext } from '../context/ImageContext';

const UploadImage = () => {
    const { setImageSrc } = useImageContext();

    const handleUploadSuccess = (publicId: string) => {

    const storedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]");
    const updatedImages = [...storedImages, publicId];

    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

    setImageSrc(publicId);
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
                // console.log('Public ID:', results.info.public_id);
                handleUploadSuccess(results.info.public_id);
                // Update context with the new image source
                // setImageSrc(results.info.public_id); 
            } else {
              console.error("Invalid upload results:", results);
            }
        }}
    >
        {/* //Button */}
        {({ open }) => {
            return (
                <Button variant="outline" size="sm" onClick={() => open()}>
                    Upload Image
                </Button>
            );
        }}
    </CldUploadWidget>
  );
};

export default UploadImage;
