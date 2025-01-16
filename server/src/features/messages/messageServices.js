import { createConversation, getConversationParticipants, getMessagesRepository, saveMessage } from './messageRepository.js';
import { socketHandler, userSocketMap } from '../../sockets/socketHandler.js'
import { getIoInstance } from '../../sockets/socketManager.js';

export const createConversationService = async (userIDs, isGroup, name) => {
  // Sort userIDs to maintain consistent ordering
  const sortedUserIDs = userIDs.sort();

  // Call repository function to create a conversation or group
  const { convoID } = await createConversation(sortedUserIDs, isGroup, name);

  return { convoID };
};

export const sendMessageService = async ({
  convoID,
  userID,
  content,
  type,
  attachment,
}) => {
  // Fetch participants of the conversation
  const participants = await getConversationParticipants(convoID);

  if (!participants || participants.length === 0) {
    throw new Error('Conversation not found or has no participants.');
  }

  // Save the message in the database
  const message = await saveMessage({
    convoID,
    userID,
    content,
    type,
    attachment,
  });

  const io = getIoInstance();
  let finalStatus = "sent";

  // Emit the `receive_message` event to all participants except the sender
  participants.forEach((participant) => {
    if (participant.userID !== userID) {
      const socketID = userSocketMap[participant.userID];
      if (socketID) {
        io.to(socketID).emit('receive_message', message);
        finalStatus = "delivered";
      }
    }
  });

  if (finalStatus === "delivered") {
    await updateMessageStatus(message.messageID, finalStatus);
  }

  return {
    message: {
      ...message,
      status: finalStatus,
    },
  }
};

export const getMessagesService = async ({ convoID, cursor, limit }) => {
  // Call the repository to fetch the messages
  const { messages, nextCursor } = await getMessagesRepository({
    convoID,
    cursor,
    limit,
  });

  return { messages, nextCursor };
};
