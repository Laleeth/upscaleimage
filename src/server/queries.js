import HttpError from '@wasp/core/HttpError.js'

export const getUserImages = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const images = await context.entities.Image.findMany({
    where: {
      userId: context.user.id
    }
  });

  return images;
}