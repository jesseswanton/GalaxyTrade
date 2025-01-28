//Add compenent by using "import UploadImage from './components/UploadImage';""
// and adding "<UploadImage />""

'use client';

import { Button } from "@chakra-ui/react";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';

const UploadImage = () => {
  return (
    <CldUploadWidget
        // Cloudinary upload preset
        uploadPreset="ml_default"
        // What options show up in the widget
        options={{ sources: ['local', 'url', 'camera', 'google_drive', 'dropbox'] }}
        // What to do with the upload results
        onSuccess={(results: CloudinaryUploadWidgetResults) => {
            if (typeof results.info === 'object' && results.info?.public_id) {
            console.log('Public ID:', results.info.public_id);
            } else {
            console.error('Public ID not found or info is invalid.');
            }
        }}
    >
        {/* //Button */}
        {({ open }) => {
            return (
            <Button onClick={() => open()}>
                Upload
            </Button>
            );
        }}
    </CldUploadWidget>
  );
};

export default UploadImage;
