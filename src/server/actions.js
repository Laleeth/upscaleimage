import HttpError from '@wasp/core/HttpError.js'
import cloudinary from 'cloudinary'

export const uploadImage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { createReadStream } = await args.file
  const stream = createReadStream()
  const { url } = await cloudinary.uploader.upload(stream)

  const image = await context.entities.Image.create({
    data: {
      url,
      resolution: 'original',
      userId: context.user.id
    }
  })

  return image
}

export const upscaleImage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { imageId, newUrl, newResolution } = args

  const image = await context.entities.Image.findUnique({
    where: { id: imageId }
  })
  if (image.userId !== context.user.id) { throw new HttpError(403) }

  // Run upscale processing to generate high-resolution image.

  const updatedImage = await context.entities.Image.update({
    where: { id: imageId },
    data: { url: newUrl, resolution: newResolution }
  })

  return updatedImage
}