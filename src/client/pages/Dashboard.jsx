import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserImages from '@wasp/queries/getUserImages';
import uploadImage from '@wasp/actions/uploadImage';

export function Dashboard() {
  const { data: images, isLoading, error } = useQuery(getUserImages);
  const uploadImageFn = useAction(uploadImage);
  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    await uploadImageFn(formData);
  };

  return (
    <div className='p-4'>
      <input type='file' accept='image/*' onChange={handleImageUpload} />

      <div className='mt-4'>
        <h2 className='text-xl font-bold'>Uploaded Images:</h2>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.path}
            alt='Uploaded Image'
            className='w-64 h-auto mt-4'
          />
        ))}
      </div>
    </div>
  );
}