import HttpError from '@wasp/core/HttpError.js'

export const getUserImages = async ({ userId }, context) => {
  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });

  if (!user) throw new HttpError(404, 'No user with id ' + userId);

  return context.entities.Image.findMany({
    where: {
      user: { id: userId }
    }
  });
}

export const getImage = async (args, context) => {
  const { id } = args;

  if (!context.user) {
    throw new HttpError(401);
  }

  const image = await context.entities.Image.findUnique({
    where: { id },
    select: { userId: true }
  });

  if (!image) {
    throw new HttpError(404);
  }

  if (image.userId !== context.user.id) {
    throw new HttpError(400);
  }

  return image;
}