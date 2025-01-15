import prisma from '../../config/prismaClient.js';

// Get user by phone number
export const getUserByPhone = async (phone) => {
  return await prisma.user.findUnique({
    where: { phone },
  });
};

// Create a new user
export const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

export const getUserByUserID = async (userID) => {
  return await prisma.user.findUnique({
    where: { userID },
    select: {
      userID: true,
      name: true,
      phone: true,
      avatarUrl: true,
    },
  });
};

export const getAllUsersExceptCurrent = async (userID) => {
  return await prisma.user.findMany({
    where: {
      userID: {
        not: userID,
      },
    },
    select: {
      userID: true,
      name: true,
      phone: true,
      avatarUrl: true,
    },
  });
};
