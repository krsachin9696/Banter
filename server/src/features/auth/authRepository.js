import prisma from '../../config/prismaClient.js';

// Get user by phone number (for login verification)
export const getUserByPhone = async (phone) => {
  return await prisma.user.findUnique({
    where: { phone },
  });
};
