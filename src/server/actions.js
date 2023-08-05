import HttpError from '@wasp/core/HttpError.js'
import { enhanceImage } from './imageUtils.js'

export const uploadImage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  // Upload the image to the server and enhance it
  const enhancedImagePath = await enhanceImage(args.image);

  // Save the enhanced image path in the Image entity
  const newImage = await context.entities.Image.create({
    data: {
      path: enhancedImagePath,
      userId: context.user.id
    }
  });

  return newImage.path;
}
