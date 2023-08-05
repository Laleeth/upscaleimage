import React, { useState } from 'react';
import { useAction } from '@wasp/actions';

export function ImageUploadPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const uploadImage = useAction(uploadImage);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUploadClick = () => {
    if (selectedImage) {
      uploadImage({ file: selectedImage });
    }
  };

  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-3xl font-bold mb-6'>Image Upload</h1>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='mb-6'
      />
      {selectedImage && (
        <img src={selectedImage} alt='Selected' className='max-w-md mb-6' />
      )}
      <button
        onClick={handleUploadClick}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Upload
      </button>
    </div>
  );
}