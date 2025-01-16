import asyncHandler from '../../utils/asyncHandler.js';
import { createConversationService, getMessagesService, sendMessageService } from './messageServices.js';

export const createConversation = asyncHandler(async (req, res) => {
  const { userIDs, isGroup, name } = req.body;

  // Call service function to create a conversation or group
  const { convoID } = await createConversationService(userIDs, isGroup, name);

  return res.status(200).json({ convoID });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { convoID, content, type, attachment } = req.body;
  const userID = req.user.userID;

  // Call the service function to process the message
  const message = await sendMessageService({
    convoID,
    userID,
    content,
    type,
    attachment,
  });

  res.status(200).json({ message });
});

export const getMessages = asyncHandler(async (req, res) => {
  const { convoID, cursor, limit } = req.query;

  // Call the service function to fetch messages
  const { messages, nextCursor } = await getMessagesService({
    convoID,
    cursor,
    limit: parseInt(limit, 10) || 20, // Default limit of 20
  });

  res.status(200).json({ messages, nextCursor });
});
