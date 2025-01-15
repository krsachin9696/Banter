import prisma from '../../config/prismaClient.js';

// Fetch all conversations for a user with relevant data
export const getConversationsWithUsers = async (userID) => {
  return await prisma.conversation.findMany({
    where: {
      Participants: {
        some: {
          userID, // Get the conversations the user is part of
        },
      },
    },
    include: {
      Participants: {
        include: {
          User: {
            // Get the user details
            select: {
              userID: true,
              name: true,
              phone: true,
              avatarUrl: true,
            },
          },
        },
      },
      Messages: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1, // Get the latest message in the conversation
        select: {
          content: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });
};

export const createConversation = async (userIDs, isGroup, name) => {
  // Create a new conversation
  const conversation = await prisma.conversation.create({
    data: {
      isGroup,
      name: isGroup ? name : null, // Set the name if it's a group
      Participants: {
        create: userIDs.map(userID => ({ userID })),
      },
    },
  });

  return { convoID: conversation.convoID };
};
