import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getImage from '@wasp/queries/getImage';
import upscaleImage from '@wasp/actions/upscaleImage';

export function ImageUpscalePage() {
  const { imageId } = useParams();
  const { data: image, isLoading, error } = useQuery(getImage, { id: imageId });
  const upscaleImageFn = useAction(upscaleImage);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpscaleImage = () => {
    upscaleImageFn({ imageId });
  };

  return (
    <div className='p-4'>
      {image ? (
        <div className='flex flex-col items-center'>
          <img src={image.url} alt='Original Image' className='mb-4' />
          <button
            onClick={handleUpscaleImage}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Upscale Image
          </button>
          {image.url && (
            <div className='mt-4'>
              <img src={image.url} alt='Upscaled Image' />
            </div>
          )}
        </div>
      ) : (
        <div>No image found.</div>
      )}
    </div>
  );
}