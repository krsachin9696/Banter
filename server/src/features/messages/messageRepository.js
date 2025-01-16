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

// Save the message in the database
export const saveMessage = async ({ convoID, userID, content, type, attachment }) => {

  const message = await prisma.message.create({
    data: {
      convoID, // Direct foreign key field
      userID,  // Direct foreign key field
      content, // Message content
      type,    // Message type (e.g., "text", "image", etc.)
      attachment, // Optional field
      status: 'sent', // Default status
    },
    include: {
      User: {
        select: {
          userID: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });
  

  return {
    messageID: message.messageID,
    convoID: message.convoID,
    senderID: message.User.userID,
    content: message.content,
    type: message.type,
    attachment: message.attachment,
    createdAt: message.createdAt,
  };
};

export const updateMessageStatus = async (messageID, status) => {
  return prisma.message.update({
    where: { messageID },
    data: { status },
  });
};


// Get participants of a conversation
export const getConversationParticipants = async (convoID) => {
  const conversation = await prisma.conversation.findUnique({
    where: { convoID },
    include: {
      Participants: {
        include: {
          User: {
            select: {
              userID: true,
            },
          },
        },
      },
    },
  });

  return conversation?.Participants.map((participant) => participant.User) || [];
};

export const getMessagesRepository = async ({ convoID, cursor, limit }) => {
  const whereCondition = { convoID };

  // Fetch messages from the database using Prisma
  const messages = await prisma.message.findMany({
    where: whereCondition,
    orderBy: { createdAt: 'desc' }, // Order messages by the creation date (latest first)
    take: limit + 1, // Fetch one extra message to determine if there's a next page
    ...(cursor
      ? { skip: 1, cursor: { messageID: cursor } } // Skip the first message if cursor is provided
      : {}),
    include: {
      User: {
        select: {
          userID: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });

  // Check if there are more messages to fetch (based on the extra message)
  const hasNextPage = messages.length > limit;
  const nextCursor = hasNextPage ? messages.pop().messageID : null; // If there's a next page, return the last message's ID

  // Restructure the message data as required
  const formattedMessages = messages.map((message) => {
    return {
      messageID: message.messageID,
      senderID: message.User.userID,
      content: message.content,
      attachment: message.attachment,
      type: message.type,
      status: message.status,
      createdAt: message.createdAt,
    };
  });

  return {
    messages: formattedMessages, // Return the formatted messages
    nextCursor,
  };
};
