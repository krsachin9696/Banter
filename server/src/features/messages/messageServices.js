import { createConversation, getConversationParticipants, saveMessage } from './messageRepository.js';
import { userSocketMap } from '../../sockets/socketHandler.js'

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

  // Emit the `receive_message` event to all participants except the sender
  participants.forEach((participant) => {
    if (participant.userID !== userID) {
      const socket = userSocketMap[participant.userID];
      if (socket) {
        socket.emit('receive_message', message);
      }
    }
  });

  return message;
};