import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getImage from '@wasp/queries/getImage';
import upscaleImage from '@wasp/actions/upscaleImage';

export function ImageUpscalePage() {
  const { id } = useParams();
  const history = useHistory();
  const { data: image, isLoading, error } = useQuery(getImage, { id });
  const upscaleImageFn = useAction(upscaleImage);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpscaleImage = async () => {
    setIsProcessing(true);

    try {
      await upscaleImageFn({ imageId: id });
      alert('Image successfully upscaled!');
      history.push('/dashboard');
    } catch (error) {
      alert('Something went wrong, image not upscaled.');
      console.error(error);
      setIsProcessing(false);
    }
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <img src={image.url} alt='Original image' className='max-w-full h-auto' />
      <button
        onClick={handleUpscaleImage}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing Image...' : 'Upscale Image'}
      </button>
    </div>
  );
}